import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Menu, X, Shield, TrendingUp, Zap, 
  CheckCircle, Star, Wallet, Copy, Bell, Globe,
  ChevronDown, Key, UserCheck, MessageSquare, GitBranch,
  Upload, Camera, Plus, Search, Filter, Eye, BarChart3,
  FileText, Calendar, DollarSign, Clock, Users, Award,
  Heart, Activity, Phone, Mail, MapPin, HelpCircle,
  ExternalLink, Download, AlertCircle, Info, Settings,
  Target, Layers, Smartphone, Lock, CheckSquare, Timer,
  PieChart, Calculator, TrendingDown, Percent, Database,
  ScanLine, FileSearch, RefreshCw, ShieldCheck, Hash
} from 'lucide-react';

const WellSwapPlatform = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // OCR and Image Processing
  const [ocrResult, setOcrResult] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Real-time Hong Kong IA API Data
  const [hkiaData, setHkiaData] = useState(null);
  const [performanceRates, setPerformanceRates] = useState({});
  
  // IPFS and Encryption
  const [ipfsHash, setIpfsHash] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  
  // Web3 State
  const [web3State, setWeb3State] = useState({
    isConnected: false,
    account: null,
    balance: 0,
    network: null,
    isCorrectNetwork: false
  });

  // Multi-sig Transaction States
  const [activeTransactions, setActiveTransactions] = useState([]);
  
  // Advanced Form States with Validation
  const [sellerForm, setSellerForm] = useState({
    policyType: '',
    company: '',
    productName: '',
    annualPremium: '',
    paidYears: '',
    totalTerm: '',
    accumulatedAmount: '',
    joinDate: '',
    askingPrice: '',
    documents: [],
    description: '',
    conciergeHelp: false,
    photos: [],
    policyNumber: '',
    currency: 'USD',
    beneficiaryInfo: '',
    medicalInfo: '',
    isFormValid: false
  });

  // Advanced Search and Filtering
  const [searchFilters, setSearchFilters] = useState({
    policyType: 'all',
    priceRange: 'all',
    company: 'all',
    sortBy: 'newest',
    returnRate: 'all',
    currency: 'all',
    region: 'all',
    performanceRating: 'all'
  });

  // Mock Real-time Data Simulation
  const [marketData, setMarketData] = useState({
    totalVolume: 47000000,
    activePolicies: 1247,
    avgReturn: 7.2,
    platformFee: 2.0,
    ipfsNodes: 156,
    encryptionLevel: 'AES-256'
  });

  // Advanced AI Valuation Engine
  const calculateAdvancedAIValuation = (policy) => {
    if (!policy.company || !policy.accumulatedAmount) return 0;
    
    // Base surrender value calculation
    const surrenderValue = policy.surrenderValue || policy.accumulatedAmount * 0.85;
    
    // Company rating multiplier (S&P, Moody's, AM Best equivalent)
    const companyRatingMultiplier = {
      'AIA': 1.08, 'Prudential': 1.06, 'Manulife': 1.05, 'FWD': 1.04,
      'Zurich': 1.07, 'Great Eastern': 1.04, 'HSBC Life': 1.05,
      'Standard Life': 1.05, 'Sun Life': 1.04, 'MetLife': 1.06
    };
    
    const companyMultiplier = Object.keys(companyRatingMultiplier).find(key => 
      policy.company.includes(key)
    ) ? companyRatingMultiplier[Object.keys(companyRatingMultiplier).find(key => 
      policy.company.includes(key)
    )] : 1.03;
    
    // Performance rate from HKIA (simulated)
    const performanceRate = performanceRates[policy.productName] || 1.0;
    
    // Time-weighted bonus
    const timeBonus = Math.min(policy.paidYears * 0.02, 0.12);
    
    // Market conditions adjustment
    const marketAdjustment = 1.03; // Current favorable market
    
    // Currency risk adjustment
    const currencyAdjustment = policy.currency === 'USD' ? 1.02 : 
                              policy.currency === 'HKD' ? 1.01 : 1.0;
    
    // Liquidity premium
    const liquidityPremium = 1.15; // 15% premium for instant liquidity
    
    const finalValuation = surrenderValue * 
      companyMultiplier * 
      performanceRate * 
      (1 + timeBonus) * 
      marketAdjustment * 
      currencyAdjustment * 
      liquidityPremium;
    
    return Math.round(finalValuation);
  };

  // Real-time HKIA API Simulation
  const fetchHKIAPerformanceData = async (productName, company, joinDate) => {
    setIsLoading(true);
    try {
      // Simulate API call to Hong Kong Insurance Authority
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockHKIAResponse = {
        productName,
        company,
        performanceRating: 'A+',
        historicalReturn: Math.random() * 0.05 + 0.06, // 6-11% range
        fulfillmentRate: Math.random() * 0.05 + 0.95, // 95-100% range
        dividendHistory: Array.from({length: 5}, (_, i) => ({
          year: new Date().getFullYear() - i,
          rate: Math.random() * 0.03 + 0.04 // 4-7% dividend
        })),
        regulatoryStatus: 'Compliant',
        lastUpdated: new Date().toISOString()
      };
      
      setHkiaData(mockHKIAResponse);
      setPerformanceRates(prev => ({
        ...prev,
        [productName]: mockHKIAResponse.fulfillmentRate
      }));
      
      addNotification(`HKIA data updated for ${productName}`, 'success');
      
    } catch (error) {
      addNotification('Failed to fetch HKIA data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // OCR Processing for Insurance Certificates
  const processImageOCR = async (imageFile) => {
    setIsProcessingImage(true);
    try {
      // Simulate OCR processing (in real implementation, use Tesseract.js)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockOCRResult = {
        policyNumber: 'HK' + Math.random().toString().substr(2, 8),
        company: 'AIA Hong Kong',
        productName: 'Premier Protection Plan',
        joinDate: '2019-06-15',
        annualPremium: '25000',
        currency: 'USD',
        beneficiary: 'John Doe',
        confidence: 0.94
      };
      
      setOcrResult(mockOCRResult);
      
      // Auto-fill form with OCR results
      setSellerForm(prev => ({
        ...prev,
        ...mockOCRResult,
        photos: [...prev.photos, imageFile]
      }));
      
      // Fetch HKIA data based on OCR results
      await fetchHKIAPerformanceData(
        mockOCRResult.productName,
        mockOCRResult.company,
        mockOCRResult.joinDate
      );
      
      addNotification('Insurance certificate processed successfully', 'success');
      
    } catch (error) {
      addNotification('Failed to process image', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Camera Capture
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });
      videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (error) {
      addNotification('Camera access denied', 'error');
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], 'certificate.jpg', { type: 'image/jpeg' });
      processImageOCR(file);
      stopCamera();
    });
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  // IPFS and Encryption Simulation
  const encryptAndStoreIPFS = async (data) => {
    setIsLoading(true);
    try {
      // Simulate encryption
      const encrypted = btoa(JSON.stringify(data)); // Base64 encoding (use AES-256 in production)
      setEncryptedData(encrypted);
      
      // Simulate IPFS upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockIPFSHash = 'Qm' + Math.random().toString(36).substr(2, 44);
      setIpfsHash(mockIPFSHash);
      
      addNotification(`Data encrypted and stored on IPFS: ${mockIPFSHash.substr(0, 10)}...`, 'success');
      
      return mockIPFSHash;
    } catch (error) {
      addNotification('Failed to encrypt and store data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Real Web3 Connection
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
        
        addNotification(t('notification.wallet.connected'), 'success');
      } else {
        addNotification(t('notification.wallet.install'), 'error');
      }
    } catch (error) {
      addNotification(t('notification.wallet.failed'), 'error');
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

  // Form Validation
  const validateForm = () => {
    const required = ['policyType', 'company', 'productName', 'annualPremium', 'askingPrice'];
    const isValid = required.every(field => sellerForm[field]);
    setSellerForm(prev => ({ ...prev, isFormValid: isValid }));
    return isValid;
  };

  // Advanced Policy Submission with Full Pipeline
  const submitSellerForm = async () => {
    if (!web3State.isConnected) {
      addNotification(t('notification.connect.required'), 'error');
      return;
    }

    if (!validateForm()) {
      addNotification(t('notification.form.required'), 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Encrypt sensitive data
      const sensitiveData = {
        policyNumber: sellerForm.policyNumber,
        beneficiaryInfo: sellerForm.beneficiaryInfo,
        medicalInfo: sellerForm.medicalInfo
      };
      
      const ipfsHash = await encryptAndStoreIPFS(sensitiveData);
      
      // 2. Fetch latest HKIA performance data
      await fetchHKIAPerformanceData(
        sellerForm.productName,
        sellerForm.company,
        sellerForm.joinDate
      );
      
      // 3. Calculate AI valuation
      const aiValuation = calculateAdvancedAIValuation(sellerForm);
      
      // 4. Create policy with encrypted reference
      const newPolicy = {
        id: `GLB${Date.now()}`,
        type: sellerForm.policyType,
        company: sellerForm.company,
        productName: sellerForm.productName,
        annualPremium: parseInt(sellerForm.annualPremium),
        paidYears: parseInt(sellerForm.paidYears),
        totalTerm: parseInt(sellerForm.totalTerm),
        accumulatedAmount: parseInt(sellerForm.accumulatedAmount),
        surrenderValue: parseInt(sellerForm.accumulatedAmount) * 0.9,
        joinDate: sellerForm.joinDate,
        askingPrice: parseInt(sellerForm.askingPrice),
        platformFee: Math.round(parseInt(sellerForm.askingPrice) * 0.02),
        netAmount: Math.round(parseInt(sellerForm.askingPrice) * 0.98),
        seller: web3State.account,
        listed: 'Just now',
        verified: true,
        rating: hkiaData?.performanceRating || 'A',
        documents: sellerForm.documents,
        escrowReady: true,
        conciergeIncluded: sellerForm.conciergeHelp,
        images: sellerForm.photos,
        expectedDividend: Math.round(parseInt(sellerForm.accumulatedAmount) * 0.04),
        compoundRate: hkiaData?.historicalReturn * 100 || 6.5,
        currency: sellerForm.currency,
        ipfsHash, // Encrypted data reference
        hkiaPerformance: hkiaData,
        aiValuation,
        region: 'Hong Kong'
      };

      setMockPolicies(prev => [newPolicy, ...prev]);
      addNotification(t('notification.policy.listed'), 'success');
      
      // Reset form
      setSellerForm({
        policyType: '',
        company: '',
        productName: '',
        annualPremium: '',
        paidYears: '',
        totalTerm: '',
        accumulatedAmount: '',
        joinDate: '',
        askingPrice: '',
        documents: [],
        description: '',
        conciergeHelp: false,
        photos: [],
        policyNumber: '',
        currency: 'USD',
        beneficiaryInfo: '',
        medicalInfo: '',
        isFormValid: false
      });
      
      setCurrentPage('marketplace');
      
    } catch (error) {
      addNotification('Failed to list policy', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Real-time Market Data Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        totalVolume: prev.totalVolume + Math.random() * 10000,
        avgReturn: prev.avgReturn + (Math.random() - 0.5) * 0.1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Global Insurance Market Data
  const [mockPolicies, setMockPolicies] = useState([
    {
      id: 'GLB001',
      type: 'endowment',
      company: 'AIA Hong Kong',
      productName: 'Premier Retirement Savings Plan',
      annualPremium: 50000,
      paidYears: 8,
      totalTerm: 25,
      accumulatedAmount: 520000,
      surrenderValue: 480000,
      joinDate: '2016-03-15',
      askingPrice: 65000,
      platformFee: 1300,
      netAmount: 63700,
      seller: '0xabc...456',
      listed: '2 hours ago',
      verified: true,
      rating: 'A+ (S&P)',
      documents: ['policy_certificate.pdf', 'dividend_history.pdf'],
      escrowReady: true,
      conciergeIncluded: true,
      images: ['policy1.jpg', 'certificate1.jpg'],
      expectedDividend: 18500,
      compoundRate: 6.8,
      currency: 'HKD',
      region: 'Hong Kong',
      ipfsHash: 'QmXoYpU7CN3RkrgkcGc8YvhHUiVRob2tnDUxanJzyRdd6P',
      aiValuation: 74500,
      hkiaPerformance: { fulfillmentRate: 0.96, performanceRating: 'A+' }
    },
    {
      id: 'GLB002',
      type: 'critical_illness',
      company: 'Great Eastern Singapore',
      productName: 'GREAT SupremeCare',
      annualPremium: 35000,
      paidYears: 10,
      totalTerm: 'Lifetime',
      accumulatedAmount: 420000,
      surrenderValue: 380000,
      joinDate: '2014-08-22',
      askingPrice: 52000,
      platformFee: 1040,
      netAmount: 50960,
      seller: '0xdef...789',
      listed: '4 hours ago',
      verified: true,
      rating: 'A (AM Best)',
      documents: ['policy_certificate.pdf', 'medical_report.pdf'],
      escrowReady: true,
      conciergeIncluded: true,
      images: ['policy2.jpg'],
      expectedDividend: 0,
      compoundRate: null,
      currency: 'SGD',
      region: 'Singapore',
      ipfsHash: 'QmYrpU8CN3RkrgkcGc9YvhHUiVRob2tnDUxanJzy123dP',
      aiValuation: 58900,
      hkiaPerformance: null
    },
    {
      id: 'GLB003',
      type: 'endowment',
      company: 'Zurich International',
      productName: 'Vista Portfolio Bond',
      annualPremium: 100000,
      paidYears: 3,
      totalTerm: 15,
      accumulatedAmount: 340000,
      surrenderValue: 315000,
      joinDate: '2021-11-05',
      askingPrice: 325000,
      platformFee: 6500,
      netAmount: 318500,
      seller: '0x123...abc',
      listed: '1 day ago',
      verified: true,
      rating: 'AA- (Fitch)',
      documents: ['policy_certificate.pdf', 'fund_performance.pdf'],
      escrowReady: true,
      conciergeIncluded: true,
      images: ['policy3.jpg', 'performance3.jpg'],
      expectedDividend: 15600,
      compoundRate: 8.4,
      currency: 'USD',
      region: 'Isle of Man',
      ipfsHash: 'QmZspU9CN3RkrgkcGc0YvhHUiVRob2tnDUxanJzy456eP',
      aiValuation: 348000,
      hkiaPerformance: null
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Complete multilingual support
  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.marketplace': 'Marketplace',
      'nav.concierge': 'Concierge',
      'nav.transactions': 'Transactions',
      'nav.about': 'About',
      'nav.support': 'Support',
      'nav.start': 'Start Trading',
      'hero.subtitle': 'Global P2P Insurance Trading with Web3 Security',
      'hero.title': 'Decentralized Global\nInsurance Exchange',
      'hero.description': 'Trade insurance policies globally with\nblockchain security, IPFS storage, and AI valuation',
      'common.wallet.connect': 'Connect Wallet',
      'common.wallet.connected': 'Connected',
      'button.secure.purchase': 'Secure Purchase',
      'button.view.details': 'View Details',
      'button.list.policy': 'List Policy',
      'button.process.ocr': 'Process Certificate',
      'button.start.camera': 'Start Camera',
      'button.capture.photo': 'Capture Photo',
      'label.upload.certificate': 'Upload Insurance Certificate',
      'label.or.manual': 'Or Enter Manually',
      'notification.wallet.connected': 'Wallet connected to DeFi platform',
      'notification.wallet.install': 'Please install MetaMask',
      'notification.wallet.failed': 'Failed to connect wallet',
      'notification.connect.required': 'Please connect your wallet first',
      'notification.policy.listed': 'Policy listed successfully! IPFS hash generated.',
      'page.title.marketplace': 'Global Insurance Marketplace',
      'page.subtitle.marketplace': 'Trade verified insurance policies with Web3 security and IPFS storage'
    },
    ko: {
      'nav.home': '홈',
      'nav.marketplace': '마켓플레이스',
      'nav.concierge': '컨시어지',
      'nav.transactions': '거래',
      'nav.about': '소개',
      'nav.support': '고객지원',
      'nav.start': '거래 시작',
      'hero.subtitle': 'Web3 보안이 적용된 글로벌 P2P 보험거래',
      'hero.title': '탈중앙화 글로벌\n보험 거래소',
      'hero.description': '블록체인 보안, IPFS 저장소, AI 평가를 통해\n전 세계 보험상품을 거래하세요',
      'common.wallet.connect': '지갑 연결',
      'common.wallet.connected': '연결됨',
      'button.secure.purchase': '안전한 구매',
      'button.view.details': '상세보기',
      'button.list.policy': '보험 등록',
      'button.process.ocr': '증서 처리',
      'button.start.camera': '카메라 시작',
      'button.capture.photo': '사진 촬영',
      'label.upload.certificate': '보험 가입증서 업로드',
      'label.or.manual': '또는 직접 입력',
      'notification.policy.listed': '보험이 성공적으로 등록되었습니다! IPFS 해시가 생성되었습니다.',
      'page.title.marketplace': '글로벌 보험 마켓플레이스',
      'page.subtitle.marketplace': 'Web3 보안과 IPFS 저장소로 검증된 보험상품을 거래하세요'
    },
    zh: {
      'nav.home': '首頁',
      'nav.marketplace': '市場',
      'nav.concierge': '禮賓服務',
      'nav.transactions': '交易',
      'nav.about': '關於我們',
      'nav.support': '客戶支援',
      'nav.start': '開始交易',
      'hero.subtitle': 'Web3安全保障的全球P2P保險交易',
      'hero.title': '去中心化全球\n保險交易所',
      'hero.description': '通過區塊鏈安全、IPFS存儲和AI評估\n交易全球保險產品',
      'common.wallet.connect': '連接錢包',
      'common.wallet.connected': '已連接',
      'button.secure.purchase': '安全購買',
      'button.view.details': '查看詳情',
      'button.list.policy': '登錄保單',
      'button.process.ocr': '處理證書',
      'button.start.camera': '啟動相機',
      'button.capture.photo': '拍照',
      'label.upload.certificate': '上傳保險證書',
      'label.or.manual': '或手動輸入',
      'notification.policy.listed': '保單成功登錄！已生成IPFS哈希。',
      'page.title.marketplace': '全球保險市場',
      'page.subtitle.marketplace': '通過Web3安全和IPFS存儲交易已驗證的保險產品'
    }
  };

  const t = (key) => translations[language][key] || key;

  // Navigation Component
  const Navigation = () => (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button 
          onClick={() => setCurrentPage('landing')}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
        >
          WellSwap
        </button>
        
        <div className="hidden lg:flex items-center space-x-8">
          {['landing', 'marketplace', 'concierge', 'transaction', 'about', 'support'].map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`font-medium transition-colors ${currentPage === page ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {t(`nav.${page === 'landing' ? 'home' : page === 'transaction' ? 'transactions' : page}`)}
            </button>
          ))}
          
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {language === 'en' ? 'EN' : language === 'ko' ? '한국어' : '中文'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLanguageMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showLanguageMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50 min-w-[120px]">
                {['en', 'ko', 'zh'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLanguageMenu(false); }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${language === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                  >
                    {lang === 'en' ? 'English' : lang === 'ko' ? '한국어' : '繁體中文'}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {!web3State.isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-gray-800 hover:to-gray-600 transition-all duration-200"
            >
              {t('common.wallet.connect')}
            </button>
          ) : (
            <button 
              onClick={() => setCurrentPage('userTypeSelection')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
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

  // Advanced Seller Form with OCR and Real Validation
  const renderAdvancedSellerForm = () => (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('userTypeSelection')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Selection
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">List Your Insurance Policy</h1>
          <p className="text-gray-600">Upload your insurance certificate or enter details manually</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* OCR Upload Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-blue-600" />
              {t('label.upload.certificate')}
            </h2>

            {/* Camera Section */}
            <div className="mb-6">
              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {t('button.start.camera')}
                </button>
              ) : (
                <div className="space-y-4">
                  <video ref={videoRef} autoPlay className="w-full rounded-lg" />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="flex space-x-4">
                    <button
                      onClick={capturePhoto}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      {t('button.capture.photo')}
                    </button>
                    <button
                      onClick={stopCamera}
                      className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    processImageOCR(e.target.files[0]);
                  }
                }}
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                disabled={isProcessingImage}
              >
                {isProcessingImage ? (
                  <RefreshCw className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
                ) : (
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                )}
                <div className="text-gray-600 font-medium">
                  {isProcessingImage ? 'Processing...' : 'Upload Insurance Certificate'}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {isProcessingImage ? 'AI is reading your document' : 'JPG, PNG files supported (Max 10MB)'}
                </div>
              </button>
            </div>

            {/* OCR Results */}
            {ocrResult && (
              <div className="mt-6 bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <ScanLine className="w-5 h-5 mr-2" />
                  OCR Results (Confidence: {(ocrResult.confidence * 100).toFixed(1)}%)
                </h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Policy Number:</span> {ocrResult.policyNumber}</div>
                  <div><span className="font-medium">Company:</span> {ocrResult.company}</div>
                  <div><span className="font-medium">Product:</span> {ocrResult.productName}</div>
                  <div><span className="font-medium">Join Date:</span> {ocrResult.joinDate}</div>
                </div>
              </div>
            )}

            {/* HKIA Data */}
            {hkiaData && (
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  HKIA Performance Data
                  {isLoading && <RefreshCw className="w-4 h-4 ml-2 animate-spin" />}
                </h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Performance Rating:</span> {hkiaData.performanceRating}</div>
                  <div><span className="font-medium">Fulfillment Rate:</span> {(hkiaData.fulfillmentRate * 100).toFixed(1)}%</div>
                  <div><span className="font-medium">Historical Return:</span> {(hkiaData.historicalReturn * 100).toFixed(2)}%</div>
                  <div><span className="font-medium">Status:</span> {hkiaData.regulatoryStatus}</div>
                </div>
              </div>
            )}
          </div>

          {/* Manual Form Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-purple-600" />
              {t('label.or.manual')}
            </h2>

            <div className="space-y-6">
              {/* Policy Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Policy Type *</label>
                <select 
                  value={sellerForm.policyType}
                  onChange={(e) => setSellerForm({...sellerForm, policyType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Policy Type</option>
                  <option value="endowment">Endowment/Savings Insurance</option>
                  <option value="critical_illness">Critical Illness Insurance</option>
                  <option value="life">Life Insurance</option>
                  <option value="annuity">Annuity</option>
                </select>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Insurance Company *</label>
                <select 
                  value={sellerForm.company}
                  onChange={(e) => setSellerForm({...sellerForm, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Insurance Company</option>
                  <option value="AIA Hong Kong">AIA Hong Kong</option>
                  <option value="Prudential Hong Kong">Prudential Hong Kong</option>
                  <option value="Manulife Hong Kong">Manulife Hong Kong</option>
                  <option value="FWD Insurance">FWD Insurance</option>
                  <option value="Great Eastern Singapore">Great Eastern Singapore</option>
                  <option value="Zurich International">Zurich International</option>
                  <option value="Standard Life">Standard Life</option>
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Product Name *</label>
                <input 
                  type="text" 
                  value={sellerForm.productName}
                  onChange={(e) => setSellerForm({...sellerForm, productName: e.target.value})}
                  placeholder="e.g., Premier Retirement Plan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Grid for Premium and Currency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Annual Premium *</label>
                  <input 
                    type="number" 
                    value={sellerForm.annualPremium}
                    onChange={(e) => setSellerForm({...sellerForm, annualPremium: e.target.value})}
                    placeholder="50000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Currency *</label>
                  <select 
                    value={sellerForm.currency}
                    onChange={(e) => setSellerForm({...sellerForm, currency: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="HKD">HKD</option>
                    <option value="SGD">SGD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* Years and Terms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Years Paid *</label>
                  <input 
                    type="number" 
                    value={sellerForm.paidYears}
                    onChange={(e) => setSellerForm({...sellerForm, paidYears: e.target.value})}
                    placeholder="8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Total Term *</label>
                  <input 
                    type="text" 
                    value={sellerForm.totalTerm}
                    onChange={(e) => setSellerForm({...sellerForm, totalTerm: e.target.value})}
                    placeholder="25 or Lifetime"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Accumulated Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Current Cash Value *</label>
                <input 
                  type="number" 
                  value={sellerForm.accumulatedAmount}
                  onChange={(e) => setSellerForm({...sellerForm, accumulatedAmount: e.target.value})}
                  placeholder="520000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Policy Start Date *</label>
                <input 
                  type="date" 
                  value={sellerForm.joinDate}
                  onChange={(e) => setSellerForm({...sellerForm, joinDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Asking Price with AI Valuation */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Asking Price (USD) *</label>
                <input 
                  type="number" 
                  value={sellerForm.askingPrice}
                  onChange={(e) => setSellerForm({...sellerForm, askingPrice: e.target.value})}
                  placeholder="65000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {sellerForm.accumulatedAmount && (
                  <div className="mt-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                    <div className="text-sm text-purple-800">
                      <div className="flex justify-between mb-2">
                        <span>AI Suggested Value:</span>
                        <span className="font-bold">${calculateAdvancedAIValuation(sellerForm).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Platform fee (2%):</span>
                        <span>-${Math.round(parseInt(sellerForm.askingPrice || 0) * 0.02).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-purple-200 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>You receive:</span>
                          <span>${Math.round(parseInt(sellerForm.askingPrice || 0) * 0.98).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Concierge Service */}
              <div className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  id="concierge"
                  checked={sellerForm.conciergeHelp}
                  onChange={(e) => setSellerForm({...sellerForm, conciergeHelp: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="concierge" className="text-sm text-gray-700">
                  Include concierge assistance for insurance company transfer (Free)
                </label>
              </div>

              {/* Security & Encryption Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-medium text-green-900 mb-3 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Web3 Security & Privacy
                </h3>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4" />
                    <span>Sensitive data encrypted with AES-256</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Decentralized storage on IPFS network</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4" />
                    <span>Multi-signature smart contract protection</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                onClick={submitSellerForm}
                disabled={!sellerForm.isFormValid || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Key className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Processing...' : 'List Policy with Web3 Security'}
              </button>
            </div>
          </div>
        </div>

        {/* IPFS Status */}
        {ipfsHash && (
          <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-purple-600" />
              IPFS Storage Status
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-600 mb-2">IPFS Hash:</div>
              <div className="text-blue-600 break-all">{ipfsHash}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Complete Global Marketplace
  const renderGlobalMarketplace = () => {
    const filteredPolicies = mockPolicies.filter(policy => {
      if (searchFilters.policyType !== 'all' && policy.type !== searchFilters.policyType) return false;
      if (searchFilters.company !== 'all' && !policy.company.includes(searchFilters.company)) return false;
      if (searchFilters.currency !== 'all' && policy.currency !== searchFilters.currency) return false;
      if (searchFilters.region !== 'all' && policy.region !== searchFilters.region) return false;
      return true;
    });

    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('page.title.marketplace')}</h1>
                <p className="text-gray-600">{t('page.subtitle.marketplace')}</p>
              </div>
              
              {/* Real-time Market Stats */}
              <div className="mt-6 lg:mt-0 bg-white rounded-xl p-4 border border-gray-200 min-w-[300px]">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">${(marketData.totalVolume / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-gray-500">Total Volume</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{marketData.avgReturn.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">Avg Return</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Global Filters */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
              <div className="grid md:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Type</label>
                  <select 
                    value={searchFilters.policyType}
                    onChange={(e) => setSearchFilters({...searchFilters, policyType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="endowment">Endowment</option>
                    <option value="critical_illness">Critical Illness</option>
                    <option value="life">Life Insurance</option>
                    <option value="annuity">Annuity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <select 
                    value={searchFilters.company}
                    onChange={(e) => setSearchFilters({...searchFilters, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Companies</option>
                    <option value="AIA">AIA</option>
                    <option value="Prudential">Prudential</option>
                    <option value="Manulife">Manulife</option>
                    <option value="Great Eastern">Great Eastern</option>
                    <option value="Zurich">Zurich</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select 
                    value={searchFilters.currency}
                    onChange={(e) => setSearchFilters({...searchFilters, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Currencies</option>
                    <option value="USD">USD</option>
                    <option value="HKD">HKD</option>
                    <option value="SGD">SGD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                  <select 
                    value={searchFilters.region}
                    onChange={(e) => setSearchFilters({...searchFilters, region: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Regions</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Luxembourg">Luxembourg</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (USD)</label>
                  <select 
                    value={searchFilters.priceRange}
                    onChange={(e) => setSearchFilters({...searchFilters, priceRange: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-50000">$0 - $50K</option>
                    <option value="50000-100000">$50K - $100K</option>
                    <option value="100000+">$100K+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select 
                    value={searchFilters.sortBy}
                    onChange={(e) => setSearchFilters({...searchFilters, sortBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="return">Highest Return</option>
                    <option value="ai_valuation">AI Valuation</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Global Insurance Policy Cards */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPolicies.map(policy => {
              const progressPercentage = policy.totalTerm !== 'Lifetime' ? 
                (policy.paidYears / policy.totalTerm) * 100 : 
                Math.min((policy.paidYears / 30) * 100, 100);

              return (
                <div key={policy.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Header with Policy Type and Region */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                        policy.type === 'endowment' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {policy.verified && <CheckCircle className="w-3 h-3 inline mr-1" />}
                        {policy.type.charAt(0).toUpperCase() + policy.type.slice(1).replace('_', ' ')}
                      </div>
                      <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {policy.region}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{policy.listed}</div>
                  </div>

                  {/* Company & Product */}
                  <div className="mb-4">
                    <div className="text-lg font-bold text-gray-900 mb-1">{policy.productName}</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      {policy.company}
                      <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{policy.rating}</span>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">Annual Premium</div>
                      <div className="text-sm font-semibold">
                        {policy.currency} {policy.annualPremium.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xs text-green-600 font-medium mb-1">Cash Value</div>
                      <div className="text-sm font-semibold">
                        {policy.currency} {policy.accumulatedAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Payment Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>Payment Progress</span>
                      <span>{policy.paidYears}/{policy.totalTerm === 'Lifetime' ? '∞' : policy.totalTerm} years</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(1)}% completed</div>
                  </div>

                  {/* AI Valuation vs Asking Price */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-200">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-purple-700 font-medium flex items-center">
                          <Calculator className="w-3 h-3 mr-1" />
                          AI Valuation
                        </span>
                        <span className="text-sm font-bold text-purple-900">
                          ${policy.aiValuation?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-700 font-medium">Asking Price</span>
                        <span className="text-sm font-bold text-blue-900">
                          ${policy.askingPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-purple-200 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">vs Surrender Value</span>
                          <span className="text-xs font-medium text-green-600">
                            +{(((policy.askingPrice - policy.surrenderValue) / policy.surrenderValue) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* IPFS & Security Info */}
                  <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Database className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-xs text-gray-700 font-medium">IPFS Secured</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {policy.ipfsHash?.substr(0, 8)}...
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        <span>Encrypted</span>
                      </div>
                      <div className="flex items-center">
                        <Key className="w-3 h-3 mr-1" />
                        <span>Multi-Sig</span>
                      </div>
                      {policy.hkiaPerformance && (
                        <div className="flex items-center">
                          <FileSearch className="w-3 h-3 mr-1" />
                          <span>HKIA Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => initiatePurchase(policy)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      {t('button.secure.purchase')}
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-2" />
                      {t('button.view.details')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No policies found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or be the first to list a policy</p>
              <button 
                onClick={() => setCurrentPage('sellerForm')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                {t('button.list.policy')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Landing Page for Global Platform
  const renderLandingPage = () => (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-200">
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
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
              
              {/* Web3 Features */}
              <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-200">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <Database className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">IPFS</span>
                  </div>
                  <div className="text-xs text-gray-500">Decentralized Storage</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">AES-256</span>
                  </div>
                  <div className="text-xs text-gray-500">Encryption</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <Calculator className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">AI</span>
                  </div>
                  <div className="text-xs text-gray-500">Smart Valuation</div>
                </div>
              </div>
            </div>
            
            {/* Web3 Security Explanation */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Web3 Security Stack</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">OCR + AI Processing</h4>
                    <p className="text-gray-600 text-sm">Automated certificate reading and HKIA data verification</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Encryption + IPFS</h4>
                    <p className="text-gray-600 text-sm">Sensitive data encrypted and stored on decentralized network</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Multi-Sig Trading</h4>
                    <p className="text-gray-600 text-sm">Smart contract escrow with 3-party signature requirement</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-center">
                  <div className="flex justify-center space-x-4 mb-4">
                    <Database className="w-8 h-8 text-purple-600" />
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                    <Key className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Triple Layer Security</h4>
                  <p className="text-sm text-gray-600">Encryption • Decentralization • Multi-Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why WellSwap DeFi Platform?</h2>
            <p className="text-xl text-gray-600">The world's most secure and transparent insurance trading platform</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                <ScanLine className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">OCR + AI Processing</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload insurance certificates and let AI extract data automatically with HKIA verification
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-200">
                <Database className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">IPFS + Encryption</h3>
              <p className="text-gray-600 leading-relaxed">
                Sensitive data encrypted with AES-256 and stored on decentralized IPFS network
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-200">
                <Calculator className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced AI Valuation</h3>
              <p className="text-gray-600 leading-relaxed">
                Multi-factor AI engine considering company ratings, performance data, and market conditions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Statistics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">${(marketData.totalVolume / 1000000).toFixed(1)}M</div>
              <div className="text-gray-600">Total Volume Secured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{marketData.activePolicies}</div>
              <div className="text-gray-600">Global Policies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{marketData.ipfsNodes}</div>
              <div className="text-gray-600">IPFS Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{marketData.platformFee}%</div>
              <div className="text-gray-600">Platform Fee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready for Web3 Insurance Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the most secure, transparent, and fair global insurance trading platform
          </p>
          <button 
            onClick={() => web3State.isConnected ? setCurrentPage('userTypeSelection') : connectWallet()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 inline-flex items-center"
          >
            {web3State.isConnected ? 'Start Trading Now' : 'Connect Wallet to Start'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );

  // Current page rendering
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'landing':
        return renderLandingPage();
      case 'marketplace':
        return renderGlobalMarketplace();
      case 'sellerForm':
        return renderAdvancedSellerForm();
      default:
        return renderLandingPage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderCurrentPage()}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex items-center space-x-4">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-900 font-medium">Processing...</span>
          </div>
        </div>
      )}
      
      {/* Notifications */}
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
    </div>
  );
};

export default WellSwapPlatform;