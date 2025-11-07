
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// Popup Component
const Popup = ({ onClose, content }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <span className="popup-title">SQLi</span>
                    <button className="popup-close" onClick={onClose}>×</button>
                </div>
                <div className="popup-body">
                    {content}
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const canvasRef = useRef(null);
    const [isPopupVisible, setPopupVisible] = useState(false);

    const showPopup = () => setPopupVisible(true);
    const hidePopup = () => setPopupVisible(false);

    useEffect(() => {
        // Matrix rain effect
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const matrixInterval = setInterval(drawMatrix, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Multiple glitch effects
        const glitchText = document.querySelector('.glitch');
        const original = glitchText.textContent;
        const decryptChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const binaryChars = '01';
        const matrixChars = '01アイウエオカキクケコサシスセソタチツテト';
        
        // Effect 1: Decryption effect
        function decryptEffect() {
            let iterations = 0;
            const interval = setInterval(() => {
                glitchText.textContent = original
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iterations) return original[index];
                        return decryptChars[Math.floor(Math.random() * decryptChars.length)];
                    })
                    .join('');
                
                iterations += 0.5;
                if (iterations >= original.length) {
                    clearInterval(interval);
                    glitchText.textContent = original;
                }
            }, 50);
        }

        // Effect 2: Binary corruption effect
        function binaryCorruptionEffect() {
            let flickerCount = 0;
            const maxFlickers = 8;
            
            const interval = setInterval(() => {
                if (flickerCount % 2 === 0) {
                    glitchText.textContent = original
                        .split('')
                        .map(char => {
                            if (char === ' ') return ' ';
                            return Math.random() > 0.7 ? char : binaryChars[Math.floor(Math.random() * 2)];
                        })
                        .join('');
                } else {
                    glitchText.textContent = original;
                }
                
                flickerCount++;
                if (flickerCount >= maxFlickers) {
                    clearInterval(interval);
                    glitchText.textContent = original;
                }
            }, 100);
        }

        // Effect 3: Matrix cascade effect
        function matrixCascadeEffect() {
            let position = 0;
            const cascadeLength = 5;
            
            const interval = setInterval(() => {
                glitchText.textContent = original
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index >= position && index < position + cascadeLength) {
                            return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                        }
                        return char;
                    })
                    .join('');
                
                position++;
                if (position >= original.length + cascadeLength) {
                    clearInterval(interval);
                    glitchText.textContent = original;
                }
            }, 60);
        }

        // Effect 4: Scramble and resolve effect
        function scrambleEffect() {
            let intensity = 1;
            const maxIntensity = original.length;
            
            const interval = setInterval(() => {
                if (intensity < maxIntensity) {
                    // Scramble phase
                    glitchText.textContent = original
                        .split('')
                        .map((char, index) => {
                            if (char === ' ') return ' ';
                            return Math.random() > (index / intensity) ? 
                                decryptChars[Math.floor(Math.random() * decryptChars.length)] : char;
                        })
                        .join('');
                    intensity += 0.8;
                } else {
                    clearInterval(interval);
                    glitchText.textContent = original;
                }
            }, 40);
        }

        const effects = [decryptEffect, binaryCorruptionEffect, matrixCascadeEffect, scrambleEffect];
        let effectIndex = 0;

        // Trigger first effect on page load
        const firstEffectTimeout = setTimeout(() => {
            effects[0]();
            effectIndex = 1;
        }, 500);

        // Run 2 random effects every 10 seconds
        const randomEffectsInterval = setInterval(() => {
            // First effect
            const effect1 = effects[Math.floor(Math.random() * effects.length)];
            effect1();
            
            // Second effect after 2 seconds
            setTimeout(() => {
                const effect2 = effects[Math.floor(Math.random() * effects.length)];
                effect2();
            }, 6000);
        }, 10000);

        // Hover effect: trigger 2 random effects
        const handleMouseEnter = () => {
            const effect1 = effects[Math.floor(Math.random() * effects.length)];
            effect1();
            
            setTimeout(() => {
                const effect2 = effects[Math.floor(Math.random() * effects.length)];
                effect2();
            }, 1500);
        };
        glitchText.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            clearInterval(matrixInterval);
            window.removeEventListener('resize', handleResize);
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            glitchText.removeEventListener('mouseenter', handleMouseEnter);
            clearInterval(randomEffectsInterval);
            clearTimeout(firstEffectTimeout);
        };
    }, []);

    return (
        <div>
            {isPopupVisible && <Popup 
                onClose={hidePopup} 
                content="SQL injection (SQLi) is a type of security vulnerability that allows an attacker to interfere with the queries that an application makes to its database." 
            />}
            <div className="scanline"></div>
            <nav>
                <ul>
                    <li><a href="#home">home</a></li>
                    <li><a href="#about">whoami</a></li>
                    <li><a href="#exploits">exploits</a></li>
                    <li><a href="#contact">contact</a></li>
                </ul>
            </nav>

            <section id="home" className="hero">
                <canvas className="matrix-bg" ref={canvasRef}></canvas>
                <div className="hero-content">
                    <div className="terminal-header">root@security:~#</div>
                    <h1 className="glitch">CEDRICK FALCONITE</h1>
                    <p className="subtitle">IT Systems | Network Engineer | Software Developer</p>
                    <div className="terminal-text">
                        <div className="command-line typing">cat /etc/passwd | grep cedrick</div>
                        <div style={{ opacity: 0.7, marginTop: '1rem' }}>
                            "Tech enthusiast skilled in IT support and network technology. Problem-solving pro with diverse
                            programming abilities, dedicated to crafting innovative solutions"
                        </div>
                        <div style={{ marginTop: '1.5rem', opacity: 0.8 }}>
                            &gt; Specializing in IT Support, Network Technology & Software Development<br />
                            &gt; Current focus: Cloud Support Engineer<br />
                        </div>
                    </div>
                </div>
            </section>

            <section id="about">
                <h2>whoami</h2>
                <div className="about-content">
                    <div className="terminal-box">
                        <div style={{ opacity: 0.7, marginBottom: '1rem' }}>$ cat about.txt</div>
                        <p style={{ marginBottom: '1rem' }}>
                        I have a strong expertise in software development, networking, and IT support.  I've managed network configurations, worked with various systems, resolved technical problems, and created little tools to improve the efficiency of everyday chores over the years.  This combination of experience made it easier for me to comprehend how apps and infrastructure interact in real-world situations.  In order to contribute to the development of more dependable and scalable systems, I'm now concentrating on honing my automation and cloud technology skills.
                        </p>
                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(0, 255, 0, 0.3)' }}>
                            <div style={{ opacity: 0.7 }}>$ ls skills/</div>
                            <ul className="security-skills">
                                <li>Troubleshooting hardware and software issues</li>
                                <li>System Administration</li>
                                <li>Installing, configuring and maintaining applications</li>
                                <li>Remote Support and diagnostics</li>
                                <li>OS installation and imaging</li>
                                <li>Basic Server Management</li>
                                <li>Programming Languages (C++, Java & JavaScript,)</li>
                                <li>Debugging and Testing</li>
                                <li>Network Configuration</li>
                                <li>Router, switch and firewall setup</li>
                                <li>IP Addressing and subnetting</li>
                                <li>Network troubleshooting</li>
                                <li>Understanding security basic ports</li>
                            </ul>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="stat-box">
                            <div className="stat-number">2+</div>
                            <div className="stat-label">YEARS EXPERIENCE</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">100+</div>
                            <div className="stat-label">ISSUES RESOLVED</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">20+</div>
                            <div className="stat-label">COURSES COMPLETED</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">20+</div>
                            <div className="stat-label">CERTIFICATES ACHIEVED</div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="exploits">
                <h2>projects & research</h2>
                <div className="projects-grid">
                    <div className="project-card">
                        <div className="project-header">
                        <span className="vulnerability-badge" style={{ background: 'rgba(255, 255, 0, 0.2)', borderColor: '#ffff00', color: '#ffff00', textShadow: '0 0 5px #ffff00' }}>CAPSTONE</span>
                            <div className="project-title">Web Activated e-Coffee Brewer</div>
                        </div>
                        <div className="project-desc">
                            Discovered and responsibly disclosed a critical SQL injection vulnerability in a widely-used enterprise CMS affecting 10,000+ installations. Led to CVE assignment and security patch.
                        </div>
                        <div className="project-tags">
                            <button className="tag" onClick={showPopup}>SQLi</button>
                            <span className="tag">CVE-2024-XXXX</span>
                            
                        </div>
                    </div>

                    <div className="project-card">
                        <div className="project-header">
                            <span className="vulnerability-badge" style={{ background: 'rgba(255, 165, 0, 0.2)', borderColor: '#ffa500', color: '#ffa500', textShadow: '0 0 5px #ffa500' }}>PROJECT</span>
                            <div className="project-title">Network Penetration Framework</div>
                        </div>
                        <div className="project-desc">
                            Developed custom penetration testing toolkit for automated network reconnaissance and vulnerability scanning. Features modular architecture for various attack vectors.
                        </div>
                        <div className="project-tags">
                            <span className="tag">Python</span>
                            <span className="tag">Scapy</span>
                            <span className="tag">Nmap</span>
                            <span className="tag">Metasploit</span>
                        </div>
                    </div>

                    <div className="project-card">
                        <div className="project-header">
                        <span className="vulnerability-badge" style={{ background: 'rgba(255, 165, 0, 0.2)', borderColor: '#ffa500', color: '#ffa500', textShadow: '0 0 5px #ffa500' }}>PROJECT</span>                            <div className="project-title">Zero-Day in IoT Device</div>
                        </div>
                        <div className="project-desc">
                            Identified authentication bypass in popular IoT camera system. Worked with vendor for coordinated disclosure. Resulted in firmware update pushed to 50,000+ devices.
                        </div>
                        <div className="project-tags">
                            <span className="tag">IoT Security</span>
                            <span className="tag">Firmware Analysis</span>
                            <span className="tag">Auth Bypass</span>
                        </div>
                    </div>

                    <div className="project-card">
                        <div className="project-header">
                            <span className="vulnerability-badge" style={{ background: 'rgba(255, 255, 0, 0.2)', borderColor: '#ffff00', color: '#ffff00', textShadow: '0 0 5px #ffff00' }}>MEDIUM</span>
                            <div className="project-title">XSS Vulnerability Scanner</div>
                        </div>
                        <div className="project-desc">
                            Built automated XSS detection tool that crawls web applications and identifies potential cross-site scripting vulnerabilities using fuzzing techniques and payload libraries.
                        </div>
                        <div className="project-tags">
                            <span className="tag">XSS</span>
                            <span className="tag">Automation</span>
                            <span className="tag">Web Security</span>
                        </div>
                    </div>

                    <div className="project-card">
                        <div className="project-header">
                            <span className="vulnerability-badge" style={{ background: 'rgba(255, 165, 0, 0.2)', borderColor: '#ffa500', color: '#ffa500', textShadow: '0 0 5px #ffa500' }}>HIGH</span>
                            <div className="project-title">Network Protocol Fuzzer</div>
                        </div>
                        <div className="project-desc">
                            Created fuzzing framework for testing network protocol implementations. Discovered multiple memory corruption bugs in industrial control systems.
                        </div>
                        <div className="project-tags">
                            <span className="tag">Fuzzing</span>
                            <span className="tag">Protocol Analysis</span>
                            <span className="tag">C/C++</span>
                        </div>
                    </div>

                    <div className="project-card">
                        <div className="project-header">
                            <span className="vulnerability-badge" style={{ background: 'rgba(255, 165, 0, 0.2)', borderColor: '#ffa500', color: '#ffa500', textShadow: '0 0 5px #ffa500' }}>HIGH</span>
                            <div className="project-title">Active Directory Exploitation Suite</div>
                        </div>
                        <div className="project-desc">
                            Developed toolkit for assessing Active Directory security posture. Automates enumeration, identifies misconfigurations, and simulates privilege escalation paths.
                        </div>
                        <div className="project-tags">
                            <span className="tag">Active Directory</span>
                            <span className="tag">PowerShell</span>
                            <span className="tag">Privilege Escalation</span>
                        </div>
                    </div>
                </div>

                <div className="cve-wall">
                    <div style={{ opacity: 0.7, marginBottom: '1.5rem', fontFamily: 'Courier New, monospace' }}>$ cat cve_list.txt</div>
                    <div className="cve-item">
                        <span className="cve-id">CVE-2024-XXXXX</span> - SQL Injection in Enterprise CMS v3.2 [CVSS: 9.1]
                    </div>
                    <div className="cve-item">
                        <span className="cve-id">CVE-2023-XXXXX</span> - Authentication Bypass in IoT Camera Firmware [CVSS: 8.8]
                    </div>
                    <div className="cve-item">
                        <span className="cve-id">CVE-2023-XXXXX</span> - Remote Code Execution via Deserialization [CVSS: 9.8]
                    </div>
                </div>
            </section>

            <section id="contact">
                <h2>get in touch</h2>
                <div className="contact-content">
                    <div className="terminal-box">
                        <p style={{ marginBottom: '1rem' }}>
                            Interested in collaboration, security research, or have a vulnerability to discuss? Reach out through secure channels below.
                        </p>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                            &gt; For vulnerability disclosures, please use encrypted communication<br />
                            &gt; Bug bounty tips welcome<br />
                            &gt; Always open to discussing security research
                        </p>
                    </div>

                    <div className="pgp-box">
                        <div style={{ opacity: 0.7, marginBottom: '0.5rem' }}>$ cat pgp_public_key.asc</div>
                        -----BEGIN PGP PUBLIC KEY BLOCK-----<br /><br />
                        mQINBGXXXXXXBEAC1234567890abcdefghijklmnopqrstuvwxyz...<br />
                        [Truncated for display - Full PGP key available on keyserver]<br /><br />
 G
                        -----END PGP PUBLIC KEY BLOCK-----
                    </div>

                    <div className="contact-methods">
                        <a href="mailto:cedrick@securemail.com" className="contact-method">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '0.5rem' }}>
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m2 7 10 7 10-7" />
                                <path d="M12 14L2 7" opacity="0.3" />
                            </svg>
                            <div>ENCRYPTED EMAIL</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>PGP Required</div>
                        </a>
                        <a href="https://github.com/cedrickfalconite" className="contact-method">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '0.5rem' }}>
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            <div>GITHUB</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>Security Tools</div>
                        </a>
                        <a href="https://hackerone.com/cedrick" className="contact-method">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '0.5rem' }}>
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                <path d="M12 8v8m-4-4h8" opacity="0.5" />
                            </svg>
                            <div>HACKERONE</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>Bug Bounty Profile</div>
                        </a>
                        <a href="https://twitter.com/cedricksec" className="contact-method">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '0.5rem' }}>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <div>X (TWITTER)</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>Security Updates</div>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default App;
