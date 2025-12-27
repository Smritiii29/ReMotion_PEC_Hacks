import { useState } from "react";
import { 
  MessageCircle, Clock, Bell, Calendar, X, 
  ChevronRight, Star, Zap, Search, Phone, Video 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 
import Sidebar from "@/components/Sidebar"; 
import { motion, AnimatePresence } from "framer-motion";

const ConnectOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#155d57]/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit pointer-events-none"
          >
            <div className="pointer-events-auto mx-4">
              <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
                <div className="bg-[#155d57] p-6 text-white flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Connect with Dr. Ananya</h2>
                    <p className="text-[#a9ebdf] text-sm mt-1">Book a session or start a quick call.</p>
                  </div>
                  <button onClick={onClose} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-[#a9ebdf]/30 hover:border-[#a9ebdf] hover:bg-[#a9ebdf]/10 transition-all">
                      <div className="w-10 h-10 rounded-full bg-[#e0f7fa] flex items-center justify-center text-[#155d57]">
                        <Video className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#155d57] text-sm">Video Call</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-[#ffd4d3] hover:border-[#ffaba9] hover:bg-[#ffd4d3]/20 transition-all">
                      <div className="w-10 h-10 rounded-full bg-[#fff0f0] flex items-center justify-center text-[#d64045]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#155d57] text-sm">Emergency</span>
                    </button>
                  </div>
                  <div>
                     <h3 className="font-bold text-[#155d57] mb-3">Available Slots (Tomorrow)</h3>
                     <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                       {["9:00 AM", "11:30 AM", "2:00 PM", "4:15 PM"].map((time) => (
                         <button key={time} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-[#155d57] hover:text-white hover:border-[#155d57] transition-colors whitespace-nowrap">
                           {time}
                         </button>
                       ))}
                     </div>
                  </div>
                  <Button className="w-full bg-[#155d57] hover:bg-[#124a45] text-white rounded-xl py-6 text-lg font-bold shadow-lg shadow-[#155d57]/20">
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CommunicationsHub = () => {
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const notifications = [
    { id: 1, type: "alert", text: "New Plan Assigned: Shoulder Mobility B", time: "2h ago", icon: <Star className="w-4 h-4 fill-[#fbd7ba] text-[#155d57]" /> },
    { id: 2, type: "info", text: "Your weekly summary is ready", time: "5h ago", icon: <Bell className="w-4 h-4 text-[#155d57]" /> },
    { id: 3, type: "success", text: "Dr. Ananya approved your form", time: "Yesterday", icon: <Zap className="w-4 h-4 fill-[#a9ebdf] text-[#155d57]" /> },
    { id: 4, type: "info", text: "Dr. Ananya requested a new video", time: "2 days ago", icon: <Video className="w-4 h-4 text-[#155d57]" /> },
  ];

  const reminders = [
    { id: 1, title: "Evening Decompression", time: "6:00 PM", tag: "Quest", color: "bg-[#fbd7ba]" },
    { id: 2, title: "Hydration Check", time: "Every 2h", tag: "Daily", color: "bg-[#a9ebdf]" },
    { id: 3, title: "Submit Pain Log", time: "Pending", tag: "Action", color: "bg-[#ffd4d3]" },
  ];

  return (
    // FIX 1: min-h-screen allows the page to grow. No overflow-hidden on body.
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#155d57] font-sans flex relative">
      <Sidebar activeItem="messages" />
      
      <ConnectOverlay isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />

      {/* FIX 2: Removed fixed height constraints. Let padding define the space. */}
      <main className="flex-1 p-6 lg:p-10 flex flex-col">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl px-2 font-extrabold tracking-tight text-[#000000]">
              Messages
            </h1>
            <div className="flex items-center gap-2 px-2 mt-2">
               <span className="flex h-3 w-3 rounded-full  bg-green-500 animate-pulse"></span>
               <p className="text-slate-500 text-base font-medium">Online • 5 Day Streak</p>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsConnectOpen(true)}
            className="bg-[#155d57] hover:bg-[#124a45] text-white rounded-full px-6 py-6 shadow-lg shadow-[#155d57]/20 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment
          </Button>
        </header>

        {/* FIX 3: Standard Grid. No flex-1 or h-full hacking. 
            items-start ensures columns don't stretch weirdly if one is shorter. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Therapist Chat (8 cols) 
              We give it a fixed height (h-[800px]) so it feels like a dashboard widget, 
              but the PAGE will scroll if your screen is smaller than this. */}
          <div className="lg:col-span-8">
            <Card className="h-[800px] border-none shadow-sm bg-[#ffd4d3] rounded-[32px] overflow-hidden flex flex-col">
              
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#155d57] shrink-0">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#e7af81] border-2 border-white shadow-sm flex items-center justify-center text-lg font-bold">DA</div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-white">Dr. Ananya</h2>
                    <p className="text-base text-slate-200 font-medium">Physiotherapist • Last active 10m ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="w-6 h-6 text-slate-200" />
                </Button>
              </div>

              {/* Chat Body - Messages scroll INSIDE this card, but the layout uses the main scrollbar */}
              <div className="flex-1 bg-slate-50/50 p-6 overflow-y-auto space-y-6">
                 <div className="flex justify-center">
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Yesterday</span>
                 </div>

                 <div className="flex gap-4 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-[#df995f] flex items-center justify-center text-xs font-bold shrink-0">DA</div>
                    <div>
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-[#155d57] text-base leading-relaxed">
                        Hi! I noticed your range of motion increased by 5% yesterday. That's huge! How is the pain level today?
                      </div>
                      <span className="text-[10px] text-slate-400 ml-2 mt-1">10:30 AM</span>
                    </div>
                 </div>

                 <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-[#a9ebdf] flex items-center justify-center text-xs font-bold shrink-0">ME</div>
                    <div>
                      <div className="bg-[#155d57] p-4 rounded-2xl rounded-tr-none shadow-sm text-white text-base leading-relaxed">
                        Feeling surprisingly good. A bit tight in the upper back, but the sharp pain is gone.
                      </div>
                      <span className="text-[10px] text-slate-400 mr-2 mt-1 text-right block">10:45 AM</span>
                    </div>
                 </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white m-2 rounded-[24px] border border-slate-100 flex gap-2 shadow-sm shrink-0">
                <input 
                  className="flex-1 bg-transparent px-4 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                  placeholder="Type a message to Dr. Ananya..."
                />
                <Button size="icon" className="rounded-full bg-[#155d57] hover:bg-[#124a45]">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* RIGHT: Notifications & Reminders (4 cols) 
              FIX 4: Just a standard flex stack. If this gets tall, the page gets tall. No internal scrollbar. */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Active Quests */}
            <Card className="border-none shadow-sm bg-[#a9ebdf]/20 rounded-[32px] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#155d57]">
                  <Clock className="w-5 h-5" /> Active Quests
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {reminders.map((rem) => (
                  <div key={rem.id} className="bg-white p-4 rounded-2xl border border-white hover:border-[#155d57]/20 transition-colors shadow-sm cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${rem.color} text-[#155d57]`}>
                        {rem.tag}
                      </span>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#155d57] transition-colors">{rem.time}</span>
                    </div>
                    <p className="font-bold text-[#155d57] text-sm">{rem.title}</p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs font-bold text-[#155d57] hover:bg-[#155d57]/10 rounded-xl">
                  View All Quests
                </Button>
              </CardContent>
            </Card>

            {/* 2. Notifications Log */}
            <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#155d57]">
                  <Bell className="w-5 h-5" /> Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex gap-3 items-start">
                    <div className="mt-1 p-1.5 bg-slate-50 rounded-lg shrink-0">
                      {notif.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#155d57] leading-tight">{notif.text}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>

      </main>
    </div>
  );
};

export default CommunicationsHub;