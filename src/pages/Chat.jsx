import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ChatHeader from '../components/ChatHeader.jsx';
import ChatBody from '../components/ChatBody.jsx';
import MessageInput from '../components/MessageInput.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { SocketContext } from '../context/SocketContext.jsx';
import { createConversation, getConversations } from '../services/conversationService.js';
import { getMessages, sendMessage } from '../services/messageService.js';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await getConversations();
        setConversations(response.data);
      } catch (error) {
        toast.error('Could not load conversations');
      }
    };

    loadConversations();
  }, []);

  useEffect(() => {
    if (!socket || !user) return;

    socket.on('receive_message', (message) => {
      if (message.conversationId === activeConversation?._id) {
        setMessages((prev) => [...prev, message]);
      }
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === message.conversationId
            ? { ...conv, lastMessage: message.message || 'Attachment', updatedAt: new Date().toISOString() }
            : conv
        )
      );
    });

    socket.on('typing', ({ conversationId: roomId, senderId }) => {
      if (activeConversation?._id === roomId && senderId !== user.id) {
        setTyping(true);
      }
    });

    socket.on('stop_typing', ({ conversationId: roomId, senderId }) => {
      if (activeConversation?._id === roomId && senderId !== user.id) {
        setTyping(false);
      }
    });

    return () => {
      socket.off('receive_message');
      socket.off('typing');
      socket.off('stop_typing');
    };
  }, [socket, activeConversation, user.id]);

  useEffect(() => {
    if (!conversationId || !conversations.length) return;
    const found = conversations.find((conv) => conv._id === conversationId);
    if (found) {
      setActiveConversation(found);
    }
  }, [conversationId, conversations]);

  useEffect(() => {
    if (!activeConversation) return;
    const loadMessages = async () => {
      try {
        const response = await getMessages(activeConversation._id);
        setMessages(response.data);
      } catch (error) {
        toast.error('Could not load messages');
      }
    };
    loadMessages();
  }, [activeConversation]);

  useEffect(() => {
    if (!socket || !activeConversation) return;
    socket.emit('join_room', { userId: user.id, conversationId: activeConversation._id });
  }, [socket, user.id, activeConversation]);

  const otherParticipant = useMemo(() => {
    if (!activeConversation) return null;
    return activeConversation.members.find((member) => member._id !== user.id) || activeConversation.members[0];
  }, [activeConversation, user.id]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages([]);
    navigate(`/chat/${conversation._id}`);
  };

  const handleCreateConversation = async () => {
    try {
      const target = prompt('Enter email of user to chat with');
      if (!target) return;
      const response = await createConversation({ targetEmail: target });
      setConversations((prev) => [response.data, ...prev]);
      setActiveConversation(response.data);
      navigate(`/chat/${response.data._id}`);
      toast.success('Conversation created');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to create conversation');
    }
  };

  const handleSend = async ({ message, image, file }) => {
    if (!activeConversation) {
      toast.error('Select a conversation first');
      return;
    }

    const payload = {
      conversationId: activeConversation._id,
      sender: user.id,
      receiver: otherParticipant?._id,
      message,
      image,
      file,
    };

    try {
      await sendMessage(payload);
      socket.emit('send_message', payload);
      setMessages((prev) => [...prev, { ...payload, _id: Date.now().toString(), createdAt: new Date().toISOString(), sender: { _id: user.id, name: user.name, avatar: user.avatar }, receiver: { _id: otherParticipant?._id } }]);
    } catch (error) {
      toast.error('Message not sent');
    }
  };

  const filteredConversations = conversations.filter((conversation) => {
    const other = conversation.members.find((member) => member._id !== user.id);
    return (
      other?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[320px_1fr] lg:px-6">
        <Sidebar
          conversations={filteredConversations}
          activeConversationId={activeConversation?._id}
          onSelect={handleSelectConversation}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl">
          {activeConversation ? (
            <>
              <ChatHeader member={otherParticipant} isOnline={otherParticipant?.isOnline} lastSeen={otherParticipant?.lastSeen} />
              <ChatBody messages={messages} userId={user.id} typing={typing} />
              <MessageInput onSend={handleSend} onTyping={() => socket?.emit('typing', { conversationId: activeConversation._id, senderId: user.id })} onStopTyping={() => socket?.emit('stop_typing', { conversationId: activeConversation._id, senderId: user.id })} />
            </>
          ) : (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-10 text-center text-slate-400">
              <p className="max-w-xl text-lg">Select a conversation from the left or create a new chat to start messaging in real-time.</p>
              <button onClick={handleCreateConversation} className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">
                Start New Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
