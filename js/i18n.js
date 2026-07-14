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
      newPost:'New Post', newReel:'New Reel', newStory:'New Story', goLive:'Go Live', createAd:'Create Advertisement',
      editProfile:'Edit Profile', saved:'Saved', notifications:'Notifications', messages:'Messages',
      settings:'Settings', search:'Search', ai:'AI', help:'Help', about:'About', privacy:'Privacy',
      terms:'Terms', contact:'Contact', notFound:'Not Found (404)',

      /* Notifications view */
      markAllRead:'Mark all as read',
      newNotifications:'New',
      earlier:'Earlier',
      followBack:'Follow back',
      noNotifications:'No notifications yet',
      noNotificationsSub:'When someone rates, comments on, or follows your work, it will show up here.',

      /* Messages view */
      noConversation:'Your messages',
      noConversationSub:'Pick a conversation from the list to see it here.',
      typeMessage:'Type a message…',
      activeRecently:'Active recently',
      activeNow:'Active now',
      activeLast:'Active',
      newMessage:'New message',
      searchMessages:'Search messages',
      noSearchResults:'No results found',
      voiceCall:'Voice call',
      videoCall:'Video call',
      convInfo:'Conversation info',
      emoji:'Emoji',
      noConversations:'No conversations yet',
      noConversationsSub:'Messages from people you follow will appear here.',
      attachFile:'Attach',
      sendPhotoVideo:'Photo or video',
      sendDocument:'Document',
      recordVoice:'Record voice message',
      sendVoiceMessage:'Send voice message',
      cancelRecording:'Cancel recording',
      recordingVoice:'Recording…',
      recordingTooShort:'Recording was too short to send.',
      micDenied:'Allow microphone access in your browser to record a voice message.',
      micUnsupported:'Voice recording isn\u2019t supported in this browser.',
      fileTooLargeChat:'That file is over 25MB — pick a smaller one.',
      download:'Download',
      close:'Close',
      previewPhoto:'Photo',
      previewVideo:'Video',
      previewVoice:'Voice message',

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
      continueToLumen:'Continue to Lumen',

      /* Create: shared */
      backToFeed:'Back to feed',
      mediaTooLarge:'That file is over 25MB \u2014 pick a smaller one.',
      chooseMediaFirst:'Choose a photo or video first.',

      /* Create: post */
      createPostTitle:'Share a new frame',
      createPostSub:'Upload a photo and add a caption for the community to rate.',
      dropPhotoLabel:'Upload a photo',
      dropPhotoHint:'JPG or PNG, up to 25MB.',
      captionLabel:'Caption',
      postSubmitBtn:'Post',
      postingLabel:'Posting\u2026',
      postSuccessTitle:'Frame posted',
      postSuccessSub:'Your photo is live and ready for the community to rate.',

      /* Create: reel */
      createReelTitle:'Upload a new reel',
      createReelSub:'Share a short video clip for the community to discover.',
      dropVideoLabel:'Upload a video',
      dropVideoHint:'MP4 or MOV, up to 25MB.',
      reelSubmitBtn:'Publish reel',
      publishingLabel:'Publishing\u2026',
      reelSuccessTitle:'Reel published',
      reelSuccessSub:'Your reel is live and ready for the community to watch.',

      /* Create: story */
      createStoryTitle:'Add to your story',
      createStorySub:'Stories disappear after 24 hours \u2014 share a quick moment.',
      dropStoryLabel:'Upload a photo or video',
      dropStoryHint:'JPG, PNG, MP4 or MOV, up to 25MB.',
      storySubmitBtn:'Add to story',
      addingStoryLabel:'Adding\u2026',
      storySuccessTitle:'Added to your story',
      storySuccessSub:'Your story is now visible to your followers for 24 hours.',

      /* Create: go live */
      goLiveTitle:'Go live',
      goLiveSub:'Start a live broadcast so your followers can join in real time.',
      startBroadcastBtn:'Start broadcast',
      connectingLabel:'Connecting\u2026',
      liveNowTitle:'You\u2019re live',
      liveNowSub:'Your broadcast has started \u2014 this is a concept preview only, nothing is actually streamed.',
      endBroadcastBtn:'End broadcast',

      /* Create: advertisement */
      createAdTitle:'Create an advertisement',
      createAdSub:'Set up a campaign to promote your work to a wider audience.',
      campaignNameLabel:'Campaign name',
      objectiveLabel:'Objective',
      objectiveAwareness:'Awareness',
      objectiveTraffic:'Traffic',
      objectiveFollowers:'Followers',
      budgetLabel:'Daily budget',
      adMediaLabel:'Upload ad creative',
      adMediaHint:'JPG, PNG or MP4, up to 25MB.',
      adSubmitBtn:'Submit for review',
      submittingLabel:'Submitting\u2026',
      adSuccessTitle:'Ad submitted',
      adSuccessSub:'Your campaign has been submitted for review. This is a concept preview only.'
    },
    ar: {
      home:'الصفحة الرئيسية', login:'تسجيل الدخول', register:'إنشاء حساب', forgotPassword:'استعادة كلمة المرور',
      feed:'المنشورات', discover:'الاستكشاف', reels:'الفيديوهات القصيرة', upload:'إنشاء منشور', profile:'الملف الشخصي',
      newPost:'منشور جديد', newReel:'فيديو قصير جديد', newStory:'قصة جديدة', goLive:'بث مباشر', createAd:'إنشاء إعلان',
      editProfile:'تعديل الملف الشخصي', saved:'المنشورات المحفوظة', notifications:'الإشعارات', messages:'الرسائل',
      settings:'الإعدادات', search:'البحث', ai:'أدوات الذكاء الاصطناعي', help:'المساعدة', about:'من نحن', privacy:'سياسة الخصوصية',
      terms:'شروط الاستخدام', contact:'اتصل بنا', notFound:'صفحة الخطأ',

      /* Notifications view */
      markAllRead:'تعليم الكل كمقروء',
      newNotifications:'جديدة',
      earlier:'سابقًا',
      followBack:'متابعة بالمثل',
      noNotifications:'لا توجد إشعارات بعد',
      noNotificationsSub:'عندما يقيّم أحدهم عملك أو يعلّق عليه أو يتابعك، سيظهر ذلك هنا.',

      /* Messages view */
      noConversation:'رسائلك',
      noConversationSub:'اختر محادثة من القائمة لعرضها هنا.',
      typeMessage:'اكتب رسالة…',
      activeRecently:'نشط مؤخرًا',
      activeNow:'نشط الآن',
      activeLast:'نشط',
      newMessage:'رسالة جديدة',
      searchMessages:'ابحث في الرسائل',
      noSearchResults:'لا توجد نتائج',
      voiceCall:'مكالمة صوتية',
      videoCall:'مكالمة فيديو',
      convInfo:'معلومات المحادثة',
      emoji:'الرموز التعبيرية',
      noConversations:'لا توجد محادثات بعد',
      noConversationsSub:'ستظهر هنا رسائل الأشخاص الذين تتابعهم.',
      attachFile:'إرفاق',
      sendPhotoVideo:'صورة أو فيديو',
      sendDocument:'ملف',
      recordVoice:'تسجيل رسالة صوتية',
      sendVoiceMessage:'إرسال الرسالة الصوتية',
      cancelRecording:'إلغاء التسجيل',
      recordingVoice:'جارٍ التسجيل…',
      recordingTooShort:'التسجيل كان قصيرًا جدًا ليتم إرساله.',
      micDenied:'يرجى السماح للمتصفح باستخدام الميكروفون لتسجيل رسالة صوتية.',
      micUnsupported:'تسجيل الصوت غير مدعوم في هذا المتصفح.',
      fileTooLargeChat:'هذا الملف أكبر من 25 ميجابايت — اختر ملفًا أصغر.',
      download:'تنزيل',
      close:'إغلاق',
      previewPhoto:'صورة',
      previewVideo:'فيديو',
      previewVoice:'رسالة صوتية',

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
      continueToLumen:'المتابعة إلى Lumen',

      /* Create: shared */
      backToFeed:'العودة إلى المنشورات',
      mediaTooLarge:'هذا الملف أكبر من 25 ميجابايت — اختر ملفًا أصغر.',
      chooseMediaFirst:'اختر صورة أو فيديو أولًا.',

      /* Create: post */
      createPostTitle:'شارك لقطة جديدة',
      createPostSub:'ارفع صورة وأضف وصفًا ليقيّمه المجتمع.',
      dropPhotoLabel:'ارفع صورة',
      dropPhotoHint:'JPG أو PNG، بحد أقصى 25 ميجابايت.',
      captionLabel:'الوصف',
      postSubmitBtn:'نشر',
      postingLabel:'جارٍ النشر\u2026',
      postSuccessTitle:'تم نشر اللقطة',
      postSuccessSub:'صورتك متاحة الآن وجاهزة ليقيّمها المجتمع.',

      /* Create: reel */
      createReelTitle:'ارفع فيديو قصير جديد',
      createReelSub:'شارك مقطع فيديو قصير ليكتشفه المجتمع.',
      dropVideoLabel:'ارفع فيديو',
      dropVideoHint:'MP4 أو MOV، بحد أقصى 25 ميجابايت.',
      reelSubmitBtn:'نشر الفيديو القصير',
      publishingLabel:'جارٍ النشر\u2026',
      reelSuccessTitle:'تم نشر الفيديو القصير',
      reelSuccessSub:'فيديوك القصير متاح الآن وجاهز ليشاهده المجتمع.',

      /* Create: story */
      createStoryTitle:'أضف إلى قصتك',
      createStorySub:'القصص تختفي بعد 24 ساعة — شارك لحظة سريعة.',
      dropStoryLabel:'ارفع صورة أو فيديو',
      dropStoryHint:'JPG أو PNG أو MP4 أو MOV، بحد أقصى 25 ميجابايت.',
      storySubmitBtn:'إضافة إلى القصة',
      addingStoryLabel:'جارٍ الإضافة\u2026',
      storySuccessTitle:'تمت الإضافة إلى قصتك',
      storySuccessSub:'قصتك مرئية الآن لمتابعيك لمدة 24 ساعة.',

      /* Create: go live */
      goLiveTitle:'بث مباشر',
      goLiveSub:'ابدأ بثًا مباشرًا حتى ينضم إليك متابعوك في الوقت الفعلي.',
      startBroadcastBtn:'بدء البث',
      connectingLabel:'جارٍ الاتصال\u2026',
      liveNowTitle:'أنت الآن مباشر',
      liveNowSub:'بدأ بثك المباشر — هذه معاينة مفاهيمية فقط، لا يتم بث أي شيء فعليًا.',
      endBroadcastBtn:'إنهاء البث',

      /* Create: advertisement */
      createAdTitle:'إنشاء إعلان',
      createAdSub:'أنشئ حملة للترويج لأعمالك أمام جمهور أوسع.',
      campaignNameLabel:'اسم الحملة',
      objectiveLabel:'الهدف',
      objectiveAwareness:'الوعي بالعلامة',
      objectiveTraffic:'الزيارات',
      objectiveFollowers:'المتابعون',
      budgetLabel:'الميزانية اليومية',
      adMediaLabel:'ارفع تصميم الإعلان',
      adMediaHint:'JPG أو PNG أو MP4، بحد أقصى 25 ميجابايت.',
      adSubmitBtn:'إرسال للمراجعة',
      submittingLabel:'جارٍ الإرسال\u2026',
      adSuccessTitle:'تم إرسال الإعلان',
      adSuccessSub:'تم إرسال حملتك للمراجعة. هذه معاينة مفاهيمية فقط.'
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
