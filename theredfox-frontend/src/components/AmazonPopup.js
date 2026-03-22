"use client";
import { useState, useEffect, useRef } from 'react';

const AmazonPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [targetLink, setTargetLink] = useState('https://amzn.to/4sxxjM8');
    const isFirstShowDone = useRef(false); 
    const checkIntervalRef = useRef(null);

    const countryLinks = {
        IN: 'https://amzn.to/4lFIGia',
        US: 'https://amzn.to/4sxxjM8',
        CA: 'https://amzn.to/4rMeIe0'
    };

    const imageUrl = "https://cdn.grabon.in/gograbon/indulge/wp-content/uploads/Benefits-of-a-Amazon-Prime-Membership.jpg";

    // THE MAIN ACTION: Open Affiliate Link + Close Popup
    const handleAffiliateAction = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Open the geo-targeted link
        window.open(targetLink, '_blank', 'noopener,noreferrer');
        
        // Close and start the 1-minute cooldown
        setIsVisible(false);
        localStorage.setItem('amazon_popup_last_shown', Date.now().toString());
    };

    useEffect(() => {
        // 1. Geo-Targeting
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setTargetLink(countryLinks[data.country_code] || countryLinks.US);
            })
            .catch(() => setTargetLink(countryLinks.US));

        // 2. Display Logic
        const showPopup = () => {
            setIsVisible(true);
            localStorage.setItem('amazon_popup_last_shown', Date.now().toString());
        };

        // STEP A: Initial 5-second trigger
        const initialTimer = setTimeout(() => {
            showPopup();
            isFirstShowDone.current = true;
        }, 5000);

        // STEP B: 1-minute interval check
        checkIntervalRef.current = setInterval(() => {
            const lastShown = localStorage.getItem('amazon_popup_last_shown');
            const now = Date.now();
            
            // Only trigger if the first 5s pop is done AND 60s has passed
            if (isFirstShowDone.current && (now - parseInt(lastShown) >= 60000)) {
                showPopup();
            }
        }, 5000); // Check every 5s if the 1-minute cooldown is over

        return () => {
            clearTimeout(initialTimer);
            if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        };
    }, []);

    if (!isVisible) return null;

    return (
        /* TRANSPARENT OVERLAY: 
           onClick here handles the background click to open the link.
        */
        <div style={styles.overlay} onClick={handleAffiliateAction}>
            
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button: Same function as background */}
                <button 
                    style={styles.closeBtn} 
                    onClick={handleAffiliateAction}
                >
                    ×
                </button>

                {/* Main Image: Same function as background */}
                <div style={styles.imageContainer} onClick={handleAffiliateAction}>
                    <img 
                        src={imageUrl} 
                        alt="Amazon Prime" 
                        style={styles.image} 
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Transparent dark background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100000,
        cursor: 'pointer', // Shows the hand icon in the transparent area
    },
    modal: {
        position: 'relative',
        width: '90%',
        maxWidth: '320px',
        aspectRatio: '300 / 250',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 10px 50px rgba(0,0,0,0.7)',
        overflow: 'hidden',
        cursor: 'default',
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        fontSize: '26px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
        WebkitTapHighlightColor: 'transparent',
    }
};

export default AmazonPopup;
