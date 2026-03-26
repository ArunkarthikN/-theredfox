"use client";
import { useState, useEffect, useRef } from 'react';

const AmazonPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [targetLink, setTargetLink] = useState('https://amzn.to/4sxxjM8');
    const [userCountry, setUserCountry] = useState('Unknown'); // New state for tracking
    const isFirstShowDone = useRef(false);
    const checkIntervalRef = useRef(null);

    const countryLinks = {
        IN: 'https://amzn.to/4lFIGia',
        US: 'https://amzn.to/4sxxjM8',
        CA: 'https://amzn.to/4rMeIe0',
        SG: 'https://amzn.to/4sArhtS'
    };

    const imageUrl = "https://cdn.grabon.in/gograbon/indulge/wp-content/uploads/Benefits-of-a-Amazon-Prime-Membership.jpg";

    const handleAffiliateAction = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // --- GOOGLE ANALYTICS TRACKING ---
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'amazon_popup_click', {
                'event_category': 'Affiliate',
                'event_label': userCountry, // Tracks the country (IN, US, CA)
                'value': 1
            });
        }

        window.open(targetLink, '_blank', 'noopener,noreferrer');
        setIsVisible(false);
        localStorage.setItem('amazon_popup_last_shown', Date.now().toString());
    };

    useEffect(() => {
        // 1. Geo-Targeting
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const code = data.country_code || 'US';
                setUserCountry(code); // Save for tracking
                setTargetLink(countryLinks[code] || countryLinks.US);
            })
            .catch(() => {
                setUserCountry('FailedFetch');
                setTargetLink(countryLinks.US);
            });

        // 2. Display Logic
        const showPopup = () => {
            setIsVisible(true);
            localStorage.setItem('amazon_popup_last_shown', Date.now().toString());
        };

        const initialTimer = setTimeout(() => {
            showPopup();
            isFirstShowDone.current = true;
        }, 5000);

        checkIntervalRef.current = setInterval(() => {
            const lastShown = localStorage.getItem('amazon_popup_last_shown');
            const now = Date.now();
            if (isFirstShowDone.current && (now - parseInt(lastShown) >= 60000)) {
                showPopup();
            }
        }, 5000);

        return () => {
            clearTimeout(initialTimer);
            if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div style={styles.overlay} onClick={handleAffiliateAction}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeBtn} onClick={handleAffiliateAction}>×</button>
                <div style={styles.imageContainer} onClick={handleAffiliateAction}>
                    <img src={imageUrl} alt="Amazon Prime" style={styles.image} />
                </div>
            </div>
        </div>
    );
};

// ... styles remain the same ...
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100000,
        cursor: 'pointer',
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
