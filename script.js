// ملف JavaScript لموقع تطبيق "جنازة"

// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // التعامل مع زر القائمة في الشاشات الصغيرة
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // تغيير شكل زر القائمة
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.toggle('active');
            });
        });
    }
    
    // إضافة سلوك التمرير السلس للروابط
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إغلاق القائمة في الشاشات الصغيرة عند النقر على رابط
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.classList.remove('active');
                });
            }
            
            // التمرير إلى القسم المطلوب
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // تعويض ارتفاع شريط التنقل
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تحديث الرابط النشط أثناء التمرير
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // التعامل مع نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم النموذج
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // في الإنتاج، هنا سيتم إرسال البيانات إلى الخادم
            // لكن للعرض التوضيحي، سنعرض رسالة نجاح
            
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // عرض رسالة نجاح
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
        });
    }
    
    // إضافة تأثيرات التحريك عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .about-content, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // تشغيل التحريك عند التمرير
    window.addEventListener('scroll', animateOnScroll);
    
    // تشغيل التحريك عند تحميل الصفحة
    animateOnScroll();
});

// إضافة أنماط CSS للتحريك
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .feature-card, .about-content, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .about-content.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .menu-toggle span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle span.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    </style>
`);
