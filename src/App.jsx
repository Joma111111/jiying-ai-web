import React, { useState, useEffect } from 'react';
// ❌ 已删除 Analytics 引用
import { 
  Zap, Cpu, HardDrive, Monitor, Layers, 
  Menu, X, Download, MessageSquare, Phone, 
  Mail, ChevronRight, Play, Wand2, Globe,
  Video, Mic, Sparkles, Film, PlayCircle,
  ArrowRight, Cloud, HardDriveDownload, Check, Star,
  AlertTriangle, Info, XCircle, ShieldCheck, 
  Gift, Headphones, CreditCard, Users, ScanLine, Banknote, Key, Music, ExternalLink
} from 'lucide-react';

// ==========================================
// 👇👇👇 1. 视频教程配置区 👇👇👇
// ==========================================
const TUTORIAL_DATA = [
  { 
    title: "3分钟快速入门：从安装到生成", 
    time: "03:45",
    bvid: "BV1mHmBBBEUw" 
  },
  { 
    title: "更新教程：第一时间更新到最新版本", 
    time: "05:20",
    bvid: "BV1mHmBBBEYU" 
  },
  { 
    title: "AI配音实战：克隆你的声音", 
    time: "04:15",
    bvid: "BV1bHmBBzEPV" 
  },
  { 
    title: "阿里语音申请教程", 
    time: "06:10",
    bvid: "BV1UHmBBBEwB" 
  }
];

// ==========================================
// 2. 下载链接配置
// ==========================================
const DOWNLOAD_OPTIONS = [
  {
    name: "飞书下载", 
    desc: "内含详细安装教程 ",
    url: "https://ai.feishu.cn/wiki/IcHYwPOVSihluBk8gnscg5Z7nnf", 
    color: "bg-indigo-600 hover:bg-indigo-500", 
    icon: <Cloud size={20} />
  }
];

const ASSETS = {
  heroUI: "/hero-ui.png",     // 对应软件截图
  logo: "/logo.png",          // 对应原来的头像.png
  qrCode: "/qrcode.png",      // 对应二维码
  robotC4D: "/robot-c4d.png"  // 对应背景图
};

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [activeBvid, setActiveBvid] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="font-sans text-slate-200 bg-[#030305] min-h-screen selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
      {/* B站视频弹窗 */}
      {activeBvid && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-fade-in-up">
          <button 
            onClick={() => setActiveBvid(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
            <iframe 
              src={`//player.bilibili.com/player.html?bvid=${activeBvid}&page=1&high_quality=1&danmaku=0&autoplay=1`}
              scrolling="no" 
              border="0" 
              frameBorder="no" 
              framespacing="0" 
              allowFullScreen={true}
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      {/* 下载弹窗 */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDownloadModal(false)}></div>
          <div className="relative bg-[#10101A] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2">下载客户端</h3>
            <p className="text-slate-400 text-sm mb-6">软件包大小约 6GB，请确保网络畅通</p>
            
            <div className="space-y-4">
              {DOWNLOAD_OPTIONS.map((opt, i) => (
                <a 
                  key={i}
                  href={opt.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                     if(opt.url === '#') {
                       e.preventDefault();
                     }
                  }}
                  className={`flex items-center p-4 rounded-xl transition-all hover:scale-[1.02] group ${opt.color} text-white`}
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    {opt.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg">{opt.name}</div>
                    <div className="text-xs opacity-90">{opt.desc}</div>
                  </div>
                  {opt.url !== '#' && (
                    <ChevronRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  )}
                </a>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-slate-500">
                遇到安装问题？请查看 <button onClick={() => {setShowDownloadModal(false); scrollToSection('tutorials')}} className="text-cyan-400 hover:underline">视频教程</button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 导航栏 */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#030305]/90 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <img src={ASSETS.logo} alt="Logo" className="relative w-11 h-11 rounded-xl object-contain bg-white/5 border border-white/10" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white tracking-wide">极影AI</span>
                <span className="px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-[10px] text-cyan-400 font-normal">
                  授权代理商
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">newSmartAutoCut</span>
            </div>

          </div>

          <div className="hidden md:flex items-center space-x-12">
            {['首页', '功能', '服务', '教程', '配置', '联系'].map((item, idx) => {
              const ids = ['home', 'features', 'service', 'tutorials', 'specs', 'contact'];
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(ids[idx])}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide uppercase"
                >
                  {item}
                </button>
              )
            })}
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="px-8 py-3 rounded-lg text-sm font-bold bg-white text-black hover:bg-cyan-400 transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              立即下载
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center pt-40 pb-20 overflow-hidden z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-900/10 to-transparent blur-[120px] -z-10"></div>

        <div className="w-full px-4 md:px-12 text-center">
          
          {/* ✅ 1. 放大并增强了“授权代理商”的显示效果 */}
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/50 text-cyan-100 text-lg md:text-xl font-medium mb-10 backdrop-blur-md animate-fade-in-up shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <ShieldCheck size={28} className="text-cyan-400 shrink-0" />
            <span>
              本站为 <span className="text-cyan-400 font-bold">授权代理商</span> 运营，提供 <span className="text-cyan-400 font-bold">正版</span> 激活码与独家技术支持
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[1.05] mb-8 animate-fade-in-up delay-100">
            重塑您的 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              视频创作流
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in-up delay-200">
            极影AI (newSmartAutoCut) 是一款集成深度推理模型的智能化剪辑工具。
            <br className="hidden md:block" />
            从导入视频到成片输出，让复杂的剪辑工作变得前所未有的简单。
          </p>

          <div className="flex flex-col items-center gap-8 mb-24 animate-fade-in-up delay-300">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => setShowDownloadModal(true)} className="px-12 py-5 bg-cyan-500 hover:bg-cyan-400 text-black text-lg rounded-xl font-bold transition-all shadow-[0_0_50px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3">
                <Download size={24} />
                下载 Windows 版
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white text-lg rounded-xl font-semibold border border-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                联系咨询
                <ArrowRight size={20} />
              </button>
            </div>

            {/* ✅ 信任条 */}
            <div className="flex items-center gap-3 text-sm text-slate-400 bg-white/[0.03] px-5 py-2 rounded-full border border-white/5">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className={`w-6 h-6 rounded-full border border-[#030305] flex items-center justify-center text-[10px] font-bold text-black ${
                     ['bg-cyan-200', 'bg-purple-200', 'bg-blue-200', 'bg-white'][i-1]
                   }`}>
                     {['J', 'A', 'M', 'K'][i-1]}
                   </div>
                 ))}
               </div>
               <span>
                 🔥 本站已累计服务超 <span className="text-cyan-400 font-bold">1500+</span> 位创作者
               </span>
            </div>
          </div>

          <div className="relative w-full max-w-[90vw] mx-auto perspective-2000 animate-fade-in-up delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-purple-500/10 blur-[120px] -z-10"></div>
            <div className="relative rounded-3xl border border-white/10 bg-[#0A0A0F] shadow-2xl overflow-hidden transform rotate-x-6 hover:rotate-x-0 transition-transform duration-1000 ease-out group">
              <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/50"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/50"></div>
              </div>
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black">
                 <img src={ASSETS.heroUI} alt="极影AI 界面" className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030305] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能区域 */}
      <section id="features" className="py-32 relative z-10">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[50vw] h-[80vh] opacity-10 pointer-events-none mix-blend-screen -z-10">
           <img src={ASSETS.robotC4D} alt="AI Core" className="w-full h-full object-contain object-right" />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="mb-20 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">全能创作引擎</h2>
            <p className="text-slate-400 text-xl max-w-2xl">
              告别繁琐的手工剪辑。极影AI 支持短剧、影视解说、动漫、纪录片等全品类视频创作。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Wand2 />, title: "智能分镜剪辑", desc: "自动识别视频内容，精准切割分镜，去除冗余片段。" },
              { icon: <Mic />, title: "AI 语音合成", desc: "内置多款高拟真语音模型，克隆语音，媲美真人配音。" },
              { icon: <Globe />, title: "多语种本地化", desc: "支持Tk中视频、Tk短剧、维语解说等多语言创作。" },
              { icon: <Video />, title: "全类型覆盖", desc: "无论是影视剧、动漫还是电视连续剧，都能完美处理。" },
              { icon: <Zap />, title: "GPU 加速渲染", desc: "深度优化 N 卡性能，视频解析速度提升 300%，创作快人一步。" },
              { icon: <Layers />, title: "一键成片", desc: "从文案到视频，全流程自动化，释放您的创作潜能。" },
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 为什么选择本站 + 全网统一价格 */}
      <section id="service" className="py-24 relative bg-[#05050A] border-y border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">为什么选择本站？</h2>
            <p className="text-slate-400 text-lg">除了正版软件授权，我们还提供更多增值服务</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">正版授权</h3>
              <p className="text-slate-400">官方正版激活码，安全无忧。</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400">
                <Headphones size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1对1 技术支持</h3>
              <p className="text-slate-400">提供独家安装指导与新手入门答疑，拒绝“买完不管”，让您快速上手。</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400">
                <Gift size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">永久会员专属福利</h3>
              <p className="text-slate-400">不定期分享剪辑素材与行业动态，助力您的创作之路。</p>
            </div>
          </div>

          {/* 💰 价格公示条 */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CreditCard className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">全网统一官方定价</h4>
                <p className="text-slate-400 text-sm">官方严格执行统一售价，无任何隐形消费，保障正版权益</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {/* 月卡 */}
              <div className="px-6 py-4 rounded-xl bg-black/30 border border-white/10 flex flex-col items-center min-w-[140px] group hover:border-white/30 transition-all">
                <span className="text-slate-400 text-xs uppercase tracking-wider mb-1">月度会员</span>
                <span className="text-2xl font-bold text-cyan-400 mb-2">¥198</span>
                <button onClick={() => scrollToSection('contact')} className="w-full py-1.5 rounded-lg border border-white/20 text-xs text-white hover:bg-white hover:text-black transition-colors">
                  点击购买
                </button>
              </div>
              
              {/* 年卡 */}
              <div className="px-6 py-4 rounded-xl bg-black/30 border border-white/10 flex flex-col items-center min-w-[140px] group hover:border-white/30 transition-all">
                <span className="text-slate-400 text-xs uppercase tracking-wider mb-1">年度会员</span>
                <span className="text-2xl font-bold text-cyan-400 mb-2">¥498</span>
                <button onClick={() => scrollToSection('contact')} className="w-full py-1.5 rounded-lg border border-white/20 text-xs text-white hover:bg-white hover:text-black transition-colors">
                  点击购买
                </button>
              </div>
              
              {/* 永久卡 */}
              <div className="px-6 py-4 rounded-xl bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/30 flex flex-col items-center min-w-[160px] relative group hover:border-cyan-500/60 transition-all">
                <div className="absolute -top-2 right-2 px-2 py-0.5 bg-cyan-500 text-black text-[10px] font-bold rounded-full">推荐</div>
                <span className="text-slate-300 text-xs uppercase tracking-wider mb-1">永久会员【多模态全感知推理】</span>
                <span className="text-2xl font-bold text-cyan-400 mb-2">¥998</span>
                <button onClick={() => scrollToSection('contact')} className="w-full py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors">
                  立即购买
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 教程板块 */}
      <section id="tutorials" className="py-32 border-t border-white/5">
         <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">快速上手指南</h2>
              <p className="text-slate-400 text-lg">本站提供保姆级教程，点击封面即可播放</p>
            </div>
            <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors text-lg">
              查看更多教程 <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 group relative cursor-pointer" onClick={() => setActiveBvid(TUTORIAL_DATA[0].bvid)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-50 blur-lg transition duration-500"></div>
              <div className="relative aspect-video bg-[#0F0F15] rounded-3xl overflow-hidden flex items-center justify-center border border-white/10">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500 transition-all duration-300">
                  <Play className="text-white fill-white ml-2" size={40} />
                </div>
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-1.5 bg-black/60 backdrop-blur rounded-lg text-sm text-white mb-3 inline-block font-medium">入门必看</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{TUTORIAL_DATA[0].title}</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {TUTORIAL_DATA.slice(1).map((video, i) => (
                <div key={i} onClick={() => setActiveBvid(video.bvid)} className="flex-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl p-6 flex items-center gap-6 cursor-pointer transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">{video.title}</h4>
                    <span className="text-sm text-slate-500">{video.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
         </div>
      </section>

      {/* 配置参数 */}
      <section id="specs" className="py-32 relative">
        <div className="w-full max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-20">系统配置要求</h2>
          <div className="border border-white/10 rounded-3xl overflow-hidden bg-[#0A0A0F]/80 backdrop-blur-md">
            <div className="grid grid-cols-4 bg-white/5 border-b border-white/10 text-base font-bold text-slate-300">
              <div className="p-8">组件</div>
              <div className="p-8">最低配置</div>
              <div className="p-8 text-cyan-400">推荐配置</div>
              <div className="p-8 hidden md:block">说明</div>
            </div>
            {[
              { name: "CPU", min: "i5-8400 / R5 2600", rec: "i7-12700K / R9 5900X", note: "视频编解码核心依赖" },
              { name: "显卡", min: "N卡GTX 1060 (6GB)", rec: "N卡RTX 3060 (12GB) / 4070", note: "GPU加速和indexTTS克隆配音必须用N卡" },
              { name: "内存", min: "16GB DDR4", rec: "32GB DDR4/DDR5", note: "多进程并发需求" },
              { name: "硬盘", min: "SATA SSD 500G", rec: "NVMe M.2 SSD 1TB+", note: "素材读写速度" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 border-b border-white/5 text-base hover:bg-white/[0.02] transition-colors last:border-0">
                <div className="p-8 font-mono text-slate-400">{row.name}</div>
                <div className="p-8 text-slate-300">{row.min}</div>
                <div className="p-8 text-white font-bold">{row.rec}</div>
                <div className="p-8 text-slate-500 hidden md:block">{row.note}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-600 mt-8 font-mono">
            * 仅支持 Windows 10专业版 / 11专业版 (64-bit) 操作系统
          </p>
        </div>
      </section>

      {/* 联系方式 */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="bg-gradient-to-br from-[#10101A] to-[#05050A] border border-white/10 rounded-[2.5rem] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-20 shadow-2xl">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">准备好提升创作效率了吗？</h2>
              <p className="text-slate-400 mb-8 text-xl leading-relaxed">
                立即下载极影AI，加入数万创作者的行列。<br/>
                如有疑问，欢迎随时联系我们。
              </p>

              {/* ✅ 售后服务界定声明 */}
              <div className="mb-10 p-5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-left">
                <div className="flex items-center gap-2 text-yellow-500 font-bold mb-2">
                  <AlertTriangle size={20} />
                  <span>售后服务说明</span>
                </div>
                <p className="text-yellow-200/80 text-sm leading-relaxed">
                  因精力有限，<span className="text-yellow-200 font-bold">技术支持/远程协助仅面向本代理商购卡用户</span>。
                  咨询时请提供【激活码】核验，非本代理商订单，请联系原购买渠道，感谢理解。
                </p>
              </div>

              <div className="flex flex-col gap-5 text-slate-300 text-lg">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Mail size={22} className="text-cyan-500"/>
                  <span className="font-mono">John11031014@outlook.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Phone size={22} className="text-green-500"/>
                  <span className="font-mono">18605815719</span>
                </div>
                
                {/* ✅ 抖音跳转链接 (已更新为您提供的链接) */}
                <a 
                  href="https://v.douyin.com/tT8OAUGMh5s/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center md:justify-start gap-4 group/douyin cursor-pointer"
                >
                  <div className="w-[22px] h-[22px] bg-black rounded-md flex items-center justify-center border border-white/20 group-hover/douyin:border-cyan-400 transition-colors">
                    <Music size={14} className="text-white group-hover/douyin:text-cyan-400" />
                  </div>
                  <span className="font-mono group-hover/douyin:text-cyan-400 transition-colors flex items-center gap-2">
                    抖音：极影AI (小岳老师)
                    <ExternalLink size={14} className="opacity-0 group-hover/douyin:opacity-100 transition-opacity"/>
                  </span>
                </a>
              </div>

              <div className="mt-12">
                <button onClick={() => setShowDownloadModal(true)} className="w-full md:w-auto px-12 py-5 bg-white text-black text-lg font-bold rounded-xl hover:bg-cyan-400 transition-colors">
                  下载 Windows 客户端
                </button>
              </div>
            </div>
            
            {/* ✅ 购买区域 */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-60 transition duration-700"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105 duration-300 max-w-sm">
                
                {/* 购买流程指引 */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-6 border-b border-slate-100 pb-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <ScanLine size={16} />
                    </div>
                    <span>1.扫码</span>
                  </div>
                  <div className="h-px w-8 bg-slate-200"></div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <Banknote size={16} />
                    </div>
                    <span>2.付款</span>
                  </div>
                  <div className="h-px w-8 bg-slate-200"></div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Key size={16} />
                    </div>
                    <span className="font-bold text-green-600">3.发码</span>
                  </div>
                </div>

                <img src={ASSETS.qrCode} alt="微信二维码" className="w-56 h-56 object-contain mx-auto" />
                
                <div className="pt-5 text-center mt-2">
                  <p className="text-slate-900 font-bold text-xl mb-1">扫码添加微信咨询购买</p>
                  <p className="text-xs text-slate-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                    代理商在线 · 确认电脑配置后，付款秒发卡密
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-slate-600 text-sm border-t border-white/5 bg-[#030305]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4">
          <p>&copy; 2025 jiyingai.com 极影授权服务站. All rights reserved.</p>
          <div className="text-xs text-slate-700 leading-relaxed border-t border-white/5 pt-4">
            <p className="mb-1 font-bold">免责声明：</p>
            <p>1. 本站为极影AI(newSmartAutoCut)授权代理商运营的销售与服务平台，非极影官方网站。</p>
            <p>2. 本站所售软件均为官方正版授权，同步官方售后。</p>
            <p>3. 网站内出现的“极影”、“SmartAutoCut”等商标及软件著作权归原公司所有，本站仅作产品展示与销售用途。</p>
          </div>
        </div>
      </footer>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .rotate-x-6 { transform: rotateX(6deg); }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default LandingPage;
