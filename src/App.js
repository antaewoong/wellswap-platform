import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Menu, X, Shield, TrendingUp, Zap, 
  CheckCircle, Star, Wallet, Copy, Bell, Globe,
  ChevronDown, Key, UserCheck, MessageSquare, GitBranch
} from 'lucide-react';

const WellSwapPlatform = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const [web3State, setWeb3State] = useState({
    isConnected: false,
    account: null,
    balance: 0,
    network: null,
    isCorrectNetwork: false
  });

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        const chainId = await window.ethereum.request({
          method: 'eth_chainId'
        });
        
        setWeb3State({
          isConnected: true,
          account: accounts[0],
          balance: 5.2847,
          network: chainId,
          isCorrectNetwork: chainId === '0x38'
        });
        
        addNotification('Wallet connected to DeFi platform', 'success');
      } else {
        addNotification('Please install MetaMask', 'error');
      }
    } catch (error) {
      addNotification('Failed to connect wallet', 'error');
    }
  };

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev].slice(0, 3));
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.marketplace': 'Marketplace',
      'nav.concierge': 'Concierge',
      'nav.transactions': 'Transactions',
      'nav.about': 'About',
      'nav.support': 'Support',
      'nav.start': 'Start Trading',
      'hero.subtitle': 'P2P Insurance Trading with Multi-Sig Security',
      'hero.title': 'Decentralized Insurance\nAsset Exchange',
      'hero.description': 'Trade Hong Kong insurance policies safely through\nblockchain-secured multi-signature escrow system',
      'common.wallet.connect': 'Connect Wallet',
      'common.wallet.connected': 'Connected'
    },
    zh: {
      'nav.home': '首頁',
      'nav.marketplace': '市場',
      'nav.concierge': '禮賓服務',
      'nav.transactions': '交易',
      'nav.about': '關於我們',
      'nav.support': '客戶支援',
      'nav.start': '開始交易',
      'hero.subtitle': 'P2P保險交易配備多重簽名安全',
      'hero.title': '去中心化保險\n資產交易所',
      'hero.description': '通過區塊鏈多重簽名託管系統\n安全交易香港保險保單',
      'common.wallet.connect': '連接錢包',
      'common.wallet.connected': '已連接'
    }
  };

  const t = (key) => translations[language][key] || key;

  const Navigation = () => (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button 
          onClick={() => setCurrentPage('landing')}
          className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          WellSwap
        </button>
        
        <div className="hidden lg:flex items-center space-x-8">
          <button 
            onClick={() => setCurrentPage('landing')}
            className={`font-medium transition-colors ${currentPage === 'landing' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {t('nav.home')}
          </button>
          <button 
            onClick={() => setCurrentPage('marketplace')}
            className={`font-medium transition-colors ${currentPage === 'marketplace' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {t('nav.marketplace')}
          </button>
          <button 
            onClick={() => setCurrentPage('about')}
            className={`font-medium transition-colors ${currentPage === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {t('nav.about')}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'en' ? 'EN' : '中'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLanguageMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showLanguageMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50 min-w-[120px]">
                <button
                  onClick={() => { setLanguage('en'); setShowLanguageMenu(false); }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage('zh'); setShowLanguageMenu(false); }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${language === 'zh' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                >
                  繁體中文
                </button>
              </div>
            )}
          </div>
          
          {!web3State.isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200"
            >
              {t('common.wallet.connect')}
            </button>
          ) : (
            <button 
              onClick={() => setCurrentPage('userTypeSelection')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200"
            >
              {t('nav.start')}
            </button>
          )}
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-900"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );

  const renderLandingPage = () => (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <GitBranch className="w-4 h-4 mr-2" />
                {t('hero.subtitle')}
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                {t('hero.title').split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {t('hero.description').split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => web3State.isConnected ? setCurrentPage('userTypeSelection') : connectWallet()}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
                >
                  {web3State.isConnected ? 'Start Trading' : 'Connect Wallet'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="border border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  How It Works
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-200">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <Key className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Multi-Sig</span>
                  </div>
                  <div className="text-xs text-gray-500">3-Party Security</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Escrow</span>
                  </div>
                  <div className="text-xs text-gray-500">Funds Protected</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <UserCheck className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">P2P</span>
                  </div>
                  <div className="text-xs text-gray-500">Direct Trading</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Multi-Sig Works</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Buyer Creates Escrow</h4>
                    <p className="text-gray-600 text-sm">Funds locked in smart contract until all parties sign</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">All Parties Sign</h4>
                    <p className="text-gray-600 text-sm">Buyer, Seller, and Platform must all approve transaction</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Automatic Distribution</h4>
                    <p className="text-gray-600 text-sm">Funds released to seller, fees to platform automatically</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl p-6">
                <div className="text-center">
                  <Key className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Triple Security</h4>
                  <p className="text-sm text-gray-600">No single party can control the funds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Our DeFi Platform?</h2>
            <p className="text-xl text-gray-600">The most secure and transparent way to trade insurance policies</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                <GitBranch className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Signature Security</h3>
              <p className="text-gray-600 leading-relaxed">
                3-party signature requirement ensures no single point of failure in transactions
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-200">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Concierge Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional guidance for insurance company transfer procedures
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-200">
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">P2P Direct Trading</h3>
              <p className="text-gray-600 leading-relaxed">
                No intermediaries, direct peer-to-peer trading with smart contract protection
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$47M</div>
              <div className="text-gray-600">Total Volume Secured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1,247</div>
              <div className="text-gray-600">Policies Traded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Security Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2%</div>
              <div className="text-gray-600">Platform Fee</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready for Secure P2P Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the most secure decentralized insurance trading platform
          </p>
          <button 
            onClick={() => web3State.isConnected ? setCurrentPage('userTypeSelection') : connectWallet()}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 inline-flex items-center"
          >
            {web3State.isConnected ? 'Start Trading Now' : 'Connect Wallet to Start'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );

  const renderSimplePage = (title, description) => (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{description}</p>
        <button 
          onClick={() => setCurrentPage('landing')}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const WalletWidget = () => (
    <div className="fixed top-20 right-6 z-50">
      {web3State.isConnected && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-900">{t('common.wallet.connected')}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Address</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(web3State.account);
                    addNotification('Address copied', 'success');
                  }}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Copy className="w-3 h-3 text-gray-400" />
                </button>
              </div>
              <div className="font-mono text-sm text-gray-900">
                {web3State.account?.slice(0, 8)}...{web3State.account?.slice(-6)}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Balance</div>
              <div className="font-semibold text-gray-900">
                {web3State.balance?.toFixed(4)} BNB
              </div>
              <div className="text-xs text-gray-500">
                ≈ ${(web3State.balance * 320).toFixed(0)} USD
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const NotificationDisplay = () => (
    <div className="fixed top-20 right-6 z-40 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`bg-white border rounded-xl p-4 max-w-sm shadow-lg transform transition-all duration-500 ${
            notification.type === 'success' ? 'border-green-200' : 
            notification.type === 'error' ? 'border-red-200' : 'border-blue-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              notification.type === 'success' ? 'bg-green-100' :
              notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              <CheckCircle className={`w-3 h-3 ${
                notification.type === 'success' ? 'text-green-600' :
                notification.type === 'error' ? 'text-red-600' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <div className="text-gray-900 font-medium">{notification.message}</div>
              <div className="text-xs text-gray-500">{notification.timestamp.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">WellSwap</div>
          <p className="text-gray-400 mb-8">
            Hong Kong's first P2P DeFi platform for secure insurance policy trading
          </p>
          <div className="text-sm text-gray-500">
            © 2024 WellSwap Limited. Multi-signature security powered by BSC
          </div>
        </div>
      </div>
    </footer>
  );

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'landing':
        return renderLandingPage();
      case 'marketplace':
        return renderSimplePage('Secure Marketplace', 'Browse verified insurance policies with multi-sig protection');
      case 'about':
        return renderSimplePage('About WellSwap', 'Learn about our P2P DeFi insurance trading platform');
      case 'userTypeSelection':
        return renderSimplePage('Choose Trading Mode', 'Select whether you want to buy or sell insurance policies');
      default:
        return renderLandingPage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <WalletWidget />
      <NotificationDisplay />
      {renderCurrentPage()}
      <Footer />
    </div>
  );
};

function App() {
  return <WellSwapPlatform />;
}

export default App;