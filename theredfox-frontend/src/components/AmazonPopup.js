"use client";
import { useState, useEffect, useRef } from 'react';

const AmazonPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [targetLink, setTargetLink] = useState('https://amzn.to/4sxxjM8');
    const checkIntervalRef = useRef(null);

    const countryLinks = {
        IN: 'https://amzn.to/4lFIGia',
        US: 'https://amzn.to/4sxxjM8',
        CA: 'https://amzn.to/4rMeIe0'
    };

    const imageUrl = "https://cdn.grabon.in/gograbon/indulge/wp-content/uploads/Benefits-of-a-Amazon-Prime-Membership.jpg";

    const handleRedirectAndClose = (e) => {
        if (e) e.stopPropagation();
        window.open(targetLink, '_blank', 'noopener,noreferrer');
        setIsVisible(false);
        // Save current time as the last shown time
        localStorage.setItem('amazon_popup_last_shown', Date.now().toString());
    };

    useEffect(() => {
        // 1. Detect Country
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setTargetLink(countryLinks[data.country_code] || countryLinks.US);
            })
            .catch(() => setTargetLink(countryLinks.US));

        // 2. Logic to check if we should show the popup
        const attemptShowPopup = () => {
            const lastShown = localStorage.getItem('amazon_popup_last_shown');
            const now = Date.now();

            // Show if it has never been shown OR 60 seconds (60,000ms) have passed
            if (!lastShown || now - parseInt(lastShown) >= 60000) {
                setIsVisible(true);
                // Update timestamp immediately when it appears
                localStorage.setItem('amazon_popup_last_shown', now.toString());
            }
        };

        // Initial delay: 5 seconds after page load
        const initialTimer = setTimeout(attemptShowPopup, 5000);

        // Check every 10 seconds to see if the cooldown is over
        checkIntervalRef.current = setInterval(attemptShowPopup, 10000);

        return () => {
            clearTimeout(initialTimer);
            if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div style={styles.overlay} onClick={() => {
            setIsVisible(false); 
            localStorage.setItem('amazon_popup_last_shown', Date.now().toString());
        }}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button 
                    style={styles.closeBtn} 
                    onClick={handleRedirectAndClose}
                >
                    ×
                </button>
                <a 
                    href={targetLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        e.preventDefault();
                        handleRedirectAndClose();
                    }}
                >
                    <img 
                        src={imageUrl} 
                        alt="Amazon Prime Offer" 
                        style={styles.image}
                    />
                </a>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        cursor: 'pointer',
    },
    modal: {
        position: 'relative',
        width: '300px',
        height: '250px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
        overflow: 'hidden',
    },
    closeBtn: {
        position: 'absolute',
        top: '8px',
        right: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '28px',
        height: '28px',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    image: {
        width: '300px',
        height: '250px',
        display: 'block',
        cursor: 'pointer',
        objectFit: 'cover',
    }
};

export default AmazonPopup;
