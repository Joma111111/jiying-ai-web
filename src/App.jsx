import React, { useState, useEffect } from 'react';
import { 
  Zap, Cpu, HardDrive, Monitor, Layers, 
  Menu, X, Download, MessageSquare, Phone, 
  Mail, ChevronRight, Play, Wand2, Globe,
  Video, Mic, Sparkles, Film, PlayCircle,
  ArrowRight, Cloud, HardDriveDownload, Check, Star,
  AlertTriangle, Info, XCircle
} from 'lucide-react';

// ==========================================
// 👇👇👇 1. 价格方案配置区 (已更新) 👇👇👇
// ==========================================
const PRICING_PLANS = [
  {
    name: "月度会员",
    price: "¥198",
    period: "/ 月",
    desc: "适合初学者体验核心功能",
    features: [
      { text: "基础智能分镜剪辑", active: true },
      { text: "基础语音合成", active: true },
      { text: "快速上手指南", active: true },
      { text: "全感知推理模块", active: false }, // ❌ 不包含
      { text: "社区技术支持", active: false }    // ❌ 不包含
    ],
    btnText: "购买月卡",
    isPopular: false,
    color: "border-white/10"
  },
  {
    name: "年度会员",
    price: "¥498", 
    period: "/ 年",
    desc: "进阶创作，解锁更多AI能力",
    features: [
      { text: "包含月度版所有功能", active: true },
      { text: "基础语音合成", active: true }, // ✅ 新增
      { text: "社区技术支持服务", active: true },  // ❌ 不包含
      { text: "全感知推理模块", active: false }, 
      { text: "1对1 专属顾问", active: false }
    ],
    btnText: "购买年卡",
    isPopular: false,
    color: "border-blue-500/30"
  },
  {
    name: "永久专业版",
    price: "¥998",
    period: "/ 永久授权",
    desc: "一次付费，终身享有最强战力",
    features: [
      { text: "包含年度版所有功能", active: true },
      { text: "全感知推理模块 (核心)", active: true, highlight: true }, // 🔥 核心功能
      { text: "1对1 专属技术顾问", active: true },
      { text: "社区会员分享", active: true },
      { text: "不限视频题材", active: true }
    ],
    btnText: "立即抢购",
    isPopular: true, // 推荐高亮
    color: "border-cyan-500/50 bg-cyan-500/5"
  }
];

// ==========================================
// 👇👇👇 2. 视频教程配置区 👇👇👇
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
// 3. 下载链接配置
// ==========================================
const DOWNLOAD_OPTIONS = [
  {
    name: "飞书下载 (详细教程)", 
    desc: "详细 · 专业 · 高效 ",
    url: "https://ai.feishu.cn/wiki/IcHYwPOVSihluBk8gnscg5Z7nnf", 
    // 👇 修改点：颜色改成了靛蓝色，去掉了 opacity-50 (半透明) 和 cursor-not-allowed (禁止图标)
    color: "bg-indigo-600 hover:bg-indigo-500", 
    icon: <Cloud size={20} />
  },
  {
    name: "百度网盘下载",
    desc: "文件较大 (6GB) · 推荐客户端",
    url: "https://pan.baidu.com/s/1Lg_KTeNqP9x2oH-kNITY4w?pwd=f95s", 
    color: "bg-blue-600 hover:bg-blue-500",
    icon: <HardDriveDownload size={20} />
  }
];

const ASSETS = {
  heroUI: "https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/176933256/6YHJ9QlKrL1mW37e.png?Expires=1766938565&Signature=Dsi3bjoFaB7zeexjqVEHholY2-iSCZBV-vie7kMu85pQ4d9wU3zGKDiVRG8VthKxVZG83XwvQFObbGPaK-eqfEkZJhOAeWcXS3miGIQJxGDoICAEmvV1oYude9fjFPP-ewgWgoSsXUQH1Nj6Q84GSgJ5Ooi1dYFTULo8eLzyy5yne-KKQD8vrYUcyOEBkpm0EoKabAizH4Y78-~3epDQjnthx2gJLJ0VRc03xP3piJbLurNkmBzrZSABRJJINVM~uRX0MNw0XrUtyIUDz~o~ZJE4RTHmkvm7cOF2ICiZZht1QkeakeSbYBSIxGWQ8wOdCHJxs7~4GUuqrwzH4r-eig__&Key-Pair-Id=K3USGZIKWMDCSX",
  logo: "https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/176933256/isBCqstAvwRWH4tG.png?Expires=1766938576&Signature=UEylsM40lN2cK3ndwXjABZUKaEcs4dF9G~p5f-JzxIVivNRmlxjampnHrgUc8C7pYWOECAEiXzwIiDZXT3TcL6jyZAt5TcpbOfmAsNxCHXHhgDmQVNzvhzTXbqI1Hgn5AaktsWtM69BHtXxQW8U1nYjuCFprMgy18942Jhpq~sLuXhla0pWQYrU6aqxSclwMSlKZNlgQWWMOBqCNF-v11j6s5fsMOzYxIj40tjqvfToqZIlZkBH7KUvYzV9SiM8rdQzDB6R4r842lqWvxtEeqlLNv0A-3faWAbwGBM1jB0TpZytmNwfeKxzKGEefPb1Tt6Hzv14MQapvJRx~5xCvpg__&Key-Pair-Id=K3USGZIKWMDCSX",
  qrCode: "https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/176933256/mnepsJPUpk9PSNXe.png?Expires=1766939166&Signature=gchUzlpUmTboK7Z85O0Wo316vPGYWO-NaXaJ4nbBkKt1-hpGjjOqzRb8JxR591200b2oAgAItofHSgAzjh7Jz-HIu9wiyXlrsj8sUXmscJzt-F6dFd9cEGpf-hg3FNjnOwOih-qw5wtbhzTskSFizguCvOHKyX36xiiLl2rOgnQGHMnoa6UTrRGAFTVmbw0SnGQKwxb83ZRk~X4V6-abrY-KzVjnS4Ma4ST0wexkoPLwCqSyeACXYBxpqhReHPOxfkChbjDPElD4~uDVhSz~96lB6DiWw1Ccc7c7vrn5VMbEi2RKyLOvz8fXBRLsPA1PkJaIDVzpKpbsoxlzQBIzhw__&Key-Pair-Id=K3USGZIKWMDCSX",
  robotC4D: "https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/176933256/IFj6kAIyf2dS68jz.png?Expires=1766939273&Signature=XwylV4i7tP9o73s~arryH3Vtqg4QI8sONg5R0JsyH1yNSl9aulT2ZvJRkvNQQMNQbPALwUEQFIoqymnLPuIdk-WHafNuTCLKHJlDSqj3Cwq9xBrgCthc73OtJhrzyQrXdnY7CDYA8PeKgasPDF94JmdGagTkS9SENeX3kdxa~ly7VQ-sWu8recmhXB2Wmak8-Y5rjGGgiYVX3CrzozLF0gRUdJqk~c3J0AXxvVpj4CiNTbIsIf0l~c69a0eBnsYz~-0trekiM59MWApuAdoQElekYpw5w2ycTNtxt-NvHdLaRNDNR1Yv4QuArkcKpNlzw7gVidvlYvrSz2oUUYK9qw__&Key-Pair-Id=K3USGZIKWMDCSX"
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
            
            <h3 className="text-2xl font-bold text-white mb-2">选择下载方式</h3>
            <p className="text-slate-400 text-sm mb-6">软件包大小约 6GB，推荐使用高速网盘下载</p>
            
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
              <span className="text-xl font-bold text-white tracking-wide">极影AI</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">newSmartAutoCut</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {['首页', '功能', '价格', '教程', '配置', '联系'].map((item, idx) => {
              const ids = ['home', 'features', 'pricing', 'tutorials', 'specs', 'contact'];
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
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono tracking-wider mb-8 backdrop-blur-md animate-fade-in-up">
            <Sparkles size={12} className="mr-2" />
            全新发布 · 智能剪辑新纪元
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
            从素材识别到成片输出，让复杂的剪辑工作变得前所未有的简单。
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24 animate-fade-in-up delay-300">
            <button onClick={() => setShowDownloadModal(true)} className="px-12 py-5 bg-cyan-500 hover:bg-cyan-400 text-black text-lg rounded-xl font-bold transition-all shadow-[0_0_50px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3">
              <Download size={24} />
              下载 Windows 版
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white text-lg rounded-xl font-semibold border border-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
              联系咨询
              <ArrowRight size={20} />
            </button>
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
              { icon: <Mic />, title: "AI 语音合成", desc: "内置多款高拟真语音模型，支持情感调节，媲美真人配音。" },
              { icon: <Globe />, title: "多语种本地化", desc: "支持中视频、TikTok短剧、维语/哈语解说等跨语言创作。" },
              { icon: <Video />, title: "全类型覆盖", desc: "无论是影视剧、动漫还是游戏录屏，都能完美处理。" },
              { icon: <Zap />, title: "GPU 加速渲染", desc: "深度优化 N 卡性能，渲染速度提升 300%，创作快人一步。" },
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

      {/* 💰 价格板块 (已更新) */}
      <section id="pricing" className="py-32 relative bg-[#05050A] border-t border-white/5">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">选择适合您的方案</h2>
            <p className="text-slate-400 text-xl">灵活的付费模式，满足不同阶段的创作需求</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border ${plan.color} bg-[#0A0A0F] flex flex-col transition-transform hover:-translate-y-2 duration-300`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <Star size={12} fill="black" /> 推荐方案
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-4">{plan.desc}</p>
                </div>
                
                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-start gap-3 ${!feature.active ? 'opacity-40' : ''}`}>
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${feature.active ? 'bg-white/10' : 'bg-transparent'}`}>
                        {feature.active ? <Check size={12} className="text-cyan-400" /> : <XCircle size={14} className="text-slate-500" />}
                      </div>
                      <span className={`text-sm ${feature.highlight ? 'text-cyan-400 font-bold' : 'text-slate-300'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                    plan.isPopular 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.btnText}
                </button>
              </div>
            ))}
          </div>

          {/* ⚠️ 算力说明板块 (新增) */}
          <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="shrink-0 p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                请悉知：会员费用与算力说明
              </h4>
              <div className="text-slate-400 text-sm space-y-2 leading-relaxed">
                <p>1. <span className="text-slate-200 font-medium">会员费用</span>：仅包含软件的使用授权（如月卡/年卡/永久卡）。</p>
                <p>2. <span className="text-slate-200 font-medium">算力费用</span>：软件激活后，制作视频需要额外充值算力。</p>
                <p className="pl-4 border-l-2 border-white/10 my-2 italic">
                   参考消耗：原视频 90 分钟，生成 2000 字解说视频，约需充值 <span className="text-cyan-400">0.8 元</span> 左右。<br/>
                   具体消耗请以软件后台明确标注为准。
                </p>
                <p className="text-red-400/80 flex items-center gap-1 mt-3">
                  <Info size={14} /> 卡密一经激活，无法退换，请确认需求后购买。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 教程板块 */}
      <section id="tutorials" className="py-32 border-y border-white/5">
         <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">快速上手指南</h2>
              <p className="text-slate-400 text-lg">点击封面即可播放视频</p>
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
              { name: "CPU", min: "i5-8400 / R5 2600", rec: "i7-12700K / R9 5900X", note: "视频渲染核心依赖" },
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
            * 仅支持 Windows 10 / 11 (64-bit) 操作系统
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
              <p className="text-slate-400 mb-12 text-xl leading-relaxed">
                立即下载极影AI，加入数万创作者的行列。<br/>
                如有疑问，欢迎随时联系我们。
              </p>
              <div className="flex flex-col gap-5 text-slate-300 text-lg">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Mail size={22} className="text-cyan-500"/>
                  <span className="font-mono">John11031014@outlook.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Phone size={22} className="text-green-500"/>
                  <span className="font-mono">18605815719</span>
                </div>
              </div>
              <div className="mt-12">
                <button onClick={() => setShowDownloadModal(true)} className="w-full md:w-auto px-12 py-5 bg-white text-black text-lg font-bold rounded-xl hover:bg-cyan-400 transition-colors">
                  下载 Windows 客户端
                </button>
              </div>
            </div>
            <div className="relative group shrink-0">
              <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-60 transition duration-700"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105 duration-300">
                <img src={ASSETS.qrCode} alt="微信二维码" className="w-56 h-56 object-contain" />
                <div className="pt-5 text-center border-t border-slate-100 mt-4">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">WeChat Support</p>
                  <p className="text-slate-900 font-bold text-lg">扫码添加咨询</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 text-sm border-t border-white/5 bg-[#030305]">
        <p>&copy; 2025 极影AI (newSmartAutoCut). All rights reserved.</p>
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