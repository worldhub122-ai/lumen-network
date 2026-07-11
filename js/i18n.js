/* ============================================================
   LUMEN — SHARED I18N (EN / AR)
   Loaded before app.js / login.js on every page. Exposes:
     window.LumenI18n.translations
     window.LumenI18n.applyLanguage(lang)
     window.LumenI18n.initLanguageToggle()
   ============================================================ */
(function(){
  const translations = {
    en: {
      home:'Home', login:'Login', register:'Register', forgotPassword:'Forgot Password',
      feed:'Feed', discover:'Discover', reels:'Reels', upload:'Upload', profile:'Profile',
      editProfile:'Edit Profile', saved:'Saved', notifications:'Notifications', messages:'Messages',
      settings:'Settings', search:'Search', ai:'AI', help:'Help', about:'About', privacy:'Privacy',
      terms:'Terms', contact:'Contact', notFound:'Not Found (404)',

      /* Auth screen copy */
      backToHome:'Back to Lumen', brandTag:'Rate. Shoot. Discover.',
      welcomeBack:'Welcome back to the darkroom.',
      welcomeBackSub:'Sign in to rate today\u2019s frames and keep your own gallery growing.',
      caption1:'Chasing light before it disappears.',
      caption2:'Six a.m., the city still half-asleep.',
      caption3:'Grain, glass, and morning light.',
      emailLabel:'Email address', passwordLabel:'Password',
      rememberMe:'Remember me', forgotPasswordQ:'Forgot password?',
      showPassword:'Show password', hidePassword:'Hide password',
      signIn:'Sign in', signingIn:'Signing in\u2026',
      orContinueWith:'or continue with',
      continueWithGoogle:'Continue with Google', continueWithGithub:'Continue with GitHub',
      noAccount:'New to Lumen?', createAccount:'Create an account',
      authNote:'This is a concept interface \u2014 no account is created and nothing is stored.',

      /* Register screen copy */
      joinLumen:'Join the darkroom.',
      joinLumenSub:'Create an account to start rating frames and building your own gallery.',
      fullNameLabel:'Full name',
      usernameLabel:'Username',
      confirmPasswordLabel:'Confirm password',
      photoLabel:'Profile photo',
      photoHint:'Optional. JPG or PNG, up to 5MB.',
      uploadPhoto:'Upload photo',
      removePhoto:'Remove',
      creatingAccount:'Creating account\u2026',
      createAccountBtn:'Create account',
      alreadyHaveAccount:'Already have an account?',
      signInLink:'Sign in',
      passwordMismatch:'Passwords don\u2019t match.',
      usernameHint:'Letters, numbers and underscores only.',
      agreeTerms:'I agree to the',
      termsLink:'Terms',
      andWord:'and',
      privacyLink:'Privacy Policy',

      /* Shared concept note (forgot / reset / verify) */
      conceptNote:'This is a concept interface \u2014 nothing here is sent or stored.',
      yourEmailAddress:'the address on your account',

      /* Forgot password */
      forgotTitle:'Forgot password?',
      forgotSub:'Enter the email linked to your account and we\u2019ll send you a reset link.',
      sendResetLink:'Send reset link',
      sendingLink:'Sending\u2026',
      checkInbox:'Check your inbox',
      checkInboxSub:'We\u2019ve sent a password reset link to',
      resendEmail:'Resend email',
      resendIn:'Resend in',
      didntGetEmail:'Didn\u2019t get anything? Check your spam folder, or',
      backToSignIn:'Back to sign in',
      rememberPassword:'Remember your password?',

      /* Reset password */
      resetTitle:'Set a new password',
      resetSub:'Choose a new password for your account.',
      newPasswordLabel:'New password',
      confirmNewPasswordLabel:'Confirm new password',
      resetPasswordBtn:'Reset password',
      resettingPassword:'Resetting\u2026',
      passwordUpdated:'Password updated',
      passwordUpdatedSub:'Your password has been changed. You can now sign in with your new password.',
      continueToSignIn:'Continue to sign in',
      passwordTooShort:'Use at least 8 characters.',

      /* Verify email */
      verifyTitle:'Verify your email',
      verifySub:'We\u2019ve sent a verification link to',
      verifyResendHint:'Didn\u2019t get the email? Check your spam folder or resend it.',
      changeEmail:'Change email address',
      simulateVerify:'I\u2019ve clicked the link',
      emailVerified:'Email verified',
      emailVerifiedSub:'You\u2019re all set \u2014 your account is ready to go.',
      continueToLumen:'Continue to Lumen'
    },
    ar: {
      home:'الصفحة الرئيسية', login:'تسجيل الدخول', register:'إنشاء حساب', forgotPassword:'استعادة كلمة المرور',
      feed:'المنشورات', discover:'الاستكشاف', reels:'الفيديوهات القصيرة', upload:'إنشاء منشور', profile:'الملف الشخصي',
      editProfile:'تعديل الملف الشخصي', saved:'المنشورات المحفوظة', notifications:'الإشعارات', messages:'الرسائل',
      settings:'الإعدادات', search:'البحث', ai:'أدوات الذكاء الاصطناعي', help:'المساعدة', about:'من نحن', privacy:'سياسة الخصوصية',
      terms:'شروط الاستخدام', contact:'اتصل بنا', notFound:'صفحة الخطأ',

      /* Auth screen copy */
      backToHome:'العودة إلى Lumen', brandTag:'قيّم. صوّر. اكتشف.',
      welcomeBack:'مرحبًا بعودتك إلى غرفة التحميض.',
      welcomeBackSub:'سجّل الدخول لتقييم لقطات اليوم ومواصلة تنمية معرضك الخاص.',
      caption1:'ألاحق الضوء قبل أن يختفي.',
      caption2:'السادسة صباحًا، والمدينة لا تزال نصف نائمة.',
      caption3:'حبيبات الفيلم، الزجاج، وضوء الصباح.',
      emailLabel:'البريد الإلكتروني', passwordLabel:'كلمة المرور',
      rememberMe:'تذكرني', forgotPasswordQ:'نسيت كلمة المرور؟',
      showPassword:'إظهار كلمة المرور', hidePassword:'إخفاء كلمة المرور',
      signIn:'تسجيل الدخول', signingIn:'جارٍ تسجيل الدخول\u2026',
      orContinueWith:'أو تابع عبر',
      continueWithGoogle:'المتابعة عبر Google', continueWithGithub:'المتابعة عبر GitHub',
      noAccount:'جديد على Lumen؟', createAccount:'إنشاء حساب',
      authNote:'هذه واجهة مفاهيمية فقط \u2014 لا يتم إنشاء أي حساب ولا يُخزَّن شيء.',

      /* Register screen copy */
      joinLumen:'انضم إلى غرفة التحميض.',
      joinLumenSub:'أنشئ حسابًا لتبدأ بتقييم اللقطات وبناء معرضك الخاص.',
      fullNameLabel:'الاسم الكامل',
      usernameLabel:'اسم المستخدم',
      confirmPasswordLabel:'تأكيد كلمة المرور',
      photoLabel:'الصورة الشخصية',
      photoHint:'اختياري. JPG أو PNG، بحد أقصى 5 ميجابايت.',
      uploadPhoto:'تحميل صورة',
      removePhoto:'إزالة',
      creatingAccount:'جارٍ إنشاء الحساب\u2026',
      createAccountBtn:'إنشاء حساب',
      alreadyHaveAccount:'لديك حساب بالفعل؟',
      signInLink:'تسجيل الدخول',
      passwordMismatch:'كلمتا المرور غير متطابقتين.',
      usernameHint:'أحرف وأرقام وشرطات سفلية فقط.',
      agreeTerms:'أوافق على',
      termsLink:'الشروط',
      andWord:'و',
      privacyLink:'سياسة الخصوصية',

      /* Shared concept note (forgot / reset / verify) */
      conceptNote:'هذه واجهة مفاهيمية فقط \u2014 لا يتم إرسال أو تخزين أي شيء هنا.',
      yourEmailAddress:'البريد المرتبط بحسابك',

      /* Forgot password */
      forgotTitle:'نسيت كلمة المرور؟',
      forgotSub:'أدخل البريد الإلكتروني المرتبط بحسابك وسنرسل لك رابط إعادة التعيين.',
      sendResetLink:'إرسال رابط إعادة التعيين',
      sendingLink:'جارٍ الإرسال\u2026',
      checkInbox:'تحقق من بريدك الوارد',
      checkInboxSub:'أرسلنا رابط إعادة تعيين كلمة المرور إلى',
      resendEmail:'إعادة إرسال البريد',
      resendIn:'إعادة الإرسال خلال',
      didntGetEmail:'لم تصلك رسالة؟ تحقق من مجلد البريد العشوائي، أو',
      backToSignIn:'العودة لتسجيل الدخول',
      rememberPassword:'تذكّرت كلمة المرور؟',

      /* Reset password */
      resetTitle:'تعيين كلمة مرور جديدة',
      resetSub:'اختر كلمة مرور جديدة لحسابك.',
      newPasswordLabel:'كلمة المرور الجديدة',
      confirmNewPasswordLabel:'تأكيد كلمة المرور الجديدة',
      resetPasswordBtn:'إعادة تعيين كلمة المرور',
      resettingPassword:'جارٍ إعادة التعيين\u2026',
      passwordUpdated:'تم تحديث كلمة المرور',
      passwordUpdatedSub:'تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.',
      continueToSignIn:'المتابعة لتسجيل الدخول',
      passwordTooShort:'استخدم 8 أحرف على الأقل.',

      /* Verify email */
      verifyTitle:'تحقق من بريدك الإلكتروني',
      verifySub:'أرسلنا رابط تحقق إلى',
      verifyResendHint:'لم تصلك الرسالة؟ تحقق من مجلد البريد العشوائي أو أعد إرسالها.',
      changeEmail:'تغيير البريد الإلكتروني',
      simulateVerify:'لقد نقرت على الرابط',
      emailVerified:'تم التحقق من البريد الإلكتروني',
      emailVerifiedSub:'كل شيء جاهز \u2014 حسابك أصبح جاهزًا للاستخدام.',
      continueToLumen:'المتابعة إلى Lumen'
    }
  };

  function applyLanguage(lang){
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n;
      if(dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el=>{
      const key = el.dataset.i18nTitle;
      if(dict[key]){ el.title = dict[key]; el.setAttribute('aria-label', dict[key]); }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.dataset.i18nPlaceholder;
      if(dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
      const key = el.dataset.i18nAria;
      if(dict[key]) el.setAttribute('aria-label', dict[key]);
    });

    const toggle = document.getElementById('langToggle');
    if(toggle){
      toggle.querySelector('.lang-cur').textContent = lang === 'ar' ? 'AR' : 'EN';
      toggle.querySelector('.lang-other').textContent = lang === 'ar' ? 'EN' : 'AR';
    }
    try{ localStorage.setItem('lumen-lang', lang); }catch(e){}
    document.dispatchEvent(new CustomEvent('lumen:language', { detail:{ lang, dict } }));
  }

  function getStoredLanguage(){
    let lang = 'en';
    try{ lang = localStorage.getItem('lumen-lang') || 'en'; }catch(e){}
    return lang;
  }

  function initLanguageToggle(){
    let currentLang = getStoredLanguage();
    applyLanguage(currentLang);
    const btn = document.getElementById('langToggle');
    if(btn){
      btn.addEventListener('click', ()=>{
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage(currentLang);
      });
    }
    return currentLang;
  }

  window.LumenI18n = { translations, applyLanguage, initLanguageToggle, getStoredLanguage };
})();
