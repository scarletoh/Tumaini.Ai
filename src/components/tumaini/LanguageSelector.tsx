import { useEffect, useState, useCallback } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Kiswahili' },
];

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const initializeGoogleTranslate = useCallback(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      
      script.onerror = () => {
        console.error('Failed to load Google Translate script');
        toast.error('Failed to load translation service. Please try again later.');
        setIsTranslating(false);
      };
      
      document.body.appendChild(script);

      // Define the initialization function
      (window as any).googleTranslateElementInit = () => {
        try {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,sw',
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
          console.log('Google Translate initialized');
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
          toast.error('Failed to initialize translation service.');
        } finally {
          setIsTranslating(false);
        }
      };
    }
  }, []);

  useEffect(() => {
    initializeGoogleTranslate();
    
    // Cleanup function
    return () => {
      const script = document.getElementById('google-translate-script');
      if (script) {
        script.remove();
      }
    };
  }, [initializeGoogleTranslate]);

  const changeLanguage = useCallback((code: string) => {
    if (code === currentLang) return;
    
    setIsTranslating(true);
    setCurrentLang(code);
    
    const attemptTranslation = (attempts = 0) => {
      const maxAttempts = 5;
      const google = (window as any).google;
      
      if (google?.translate?.TranslateElement) {
        const selectField = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        
        if (selectField) {
          try {
            selectField.value = code;
            const event = new Event('change', { bubbles: true });
            selectField.dispatchEvent(event);
            
            // Show success message after a short delay
            setTimeout(() => {
              setIsTranslating(false);
              toast.success(`Language changed to ${languages.find(l => l.code === code)?.name}`);
              
              // Force Google Translate to update the page
              const iframe = document.querySelector<HTMLIFrameElement>('.goog-te-banner-frame');
              if (iframe) {
                iframe.style.display = 'none';
              }
              
              // Add a small delay to ensure translation is applied
              setTimeout(() => {
                document.documentElement.lang = code;
              }, 100);
              
            }, 500);
            
            return;
          } catch (error) {
            console.error('Error changing language:', error);
            toast.error('Failed to change language. Please try again.');
            setIsTranslating(false);
          }
        }
      }
      
      // Retry if Google Translate isn't loaded yet
      if (attempts < maxAttempts) {
        setTimeout(() => attemptTranslation(attempts + 1), 500);
      } else {
        console.error('Failed to change language: Google Translate not available');
        toast.error('Failed to change language. Please refresh and try again.');
        setIsTranslating(false);
      }
    };
    
    attemptTranslation();
    setIsOpen(false);
  }, [currentLang]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.language-selector-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div 
      className="relative ml-4 language-selector-container"
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseDown={(e) => e.preventDefault()}
        disabled={isTranslating}
        className="flex items-center space-x-1 text-sm font-medium text-gray-700 focus:outline-none select-none"
        aria-label={isTranslating ? 'Translating...' : 'Change language'}
        aria-expanded={isOpen}
      >
        {isTranslating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Globe className="w-4 h-4" />
        )}
        <span className="ml-1">
          {isTranslating ? 'Translating...' : languages.find(lang => lang.code === currentLang)?.name}
        </span>
      </button>

      {isOpen && !isTranslating && (
        <div 
          className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700"
              disabled={isTranslating || currentLang === lang.code}
            >
              <div className="flex items-center">
                {currentLang === lang.code && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                )}
                <span>{lang.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Google Translate Element - hidden */}
      <div id="google_translate_element" className="hidden"></div>
      
      {/* Google Translate UI - hidden but necessary for the API */}
      <div className="fixed top-0 left-0 -z-10 opacity-0 pointer-events-none">
        <div id=":0.targetLanguage" className="goog-te-gadget">
          <div id=":0.targetLanguageMenu"></div>
        </div>
      </div>
    </div>
  );
}
