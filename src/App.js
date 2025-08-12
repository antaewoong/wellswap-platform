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

  // Multi-sig Functions
  const initiatePurchase = (policy) => {
    if (!web3State.isConnected) {
      addNotification(t('notification.connect.required'), 'error');
      return;
    }

    const newTransaction = {
      id: `TX${Date.now()}`,
      policyId: policy.id,
      policyName: policy.productName,
      buyer: web3State.account,
      seller: policy.seller,
      amount: policy.askingPrice,
      platformFee: policy.platformFee,
      status: 'escrow_created',
      signatures: {
        buyer: false,
        seller: false,
        platform: false
      },
      createdAt: new Date(),
      escrowAddress: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 3)}`
    };

    setActiveTransactions(prev => [newTransaction, ...prev]);
    addNotification(`${policy.productName} ${t('notification.escrow.created')}`, 'success');
    setCurrentPage('transaction');
  };

  const signTransaction = (transactionId, role) => {
    setActiveTransactions(prev => 
      prev.map(tx => {
        if (tx.id === transactionId) {
          const newSignatures = { ...tx.signatures, [role]: true };
          const allSigned = Object.values(newSignatures).every(signed => signed);
          
          return {
            ...tx,
            signatures: newSignatures,
            status: allSigned ? 'completed' : 'awaiting_signatures'
          };
        }
        return tx;
      })
    );
    
    addNotification(t('notification.transaction.signed'), 'success');
  };

  // File Upload Functions
  const handleFileUpload = (files, type) => {
    if (type === 'documents') {
      setSellerForm(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)]
      }));
    } else if (type === 'photos') {
      setSellerForm(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(files)]
      }));
    }
    addNotification(`${files.length} ${t('notification.files.uploaded')}`, 'success');
  };

  const handleCameraCapture = () => {
    addNotification(t('notification.camera.feature'), 'info');
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
      'notification.escrow.created': 'escrow created',
      'notification.transaction.signed': 'Transaction signed',
      'notification.files.uploaded': ' file(s) uploaded successfully',
      'notification.camera.feature': 'Camera feature would open here',
      'notification.form.required': 'Please fill in all required fields',
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

  // Simple placeholder pages
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

  // Current page rendering
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'landing':
        return renderLandingPage();
      case 'concierge':
        return renderSimplePage('Concierge Service', 'Professional assistance for insurance transfer procedures');
      case 'about':
        return renderSimplePage('About WellSwap', 'Learn about our global DeFi insurance trading platform');
      case 'support':
        return renderSimplePage('Help & Support', 'Get help with Web3 trading and platform features');
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