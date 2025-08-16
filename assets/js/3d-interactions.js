// ===== RSC CHAIN GITBOOK - 3D INTERACTIONS =====
// ===== PROFESSIONAL BLACK & WHITE THEME =====

class RSCChain3DInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setup3DElements();
        this.setupAnimations();
        this.setupInteractiveDiagrams();
        this.setupMathematicalVisualizations();
        this.setupScrollEffects();
    }

    setup3DElements() {
        // Add 3D transform styles to blockchain diagrams
        const diagrams = document.querySelectorAll('.blockchain-diagram');
        diagrams.forEach((diagram, index) => {
            this.add3DTransform(diagram, index);
        });

        // Add 3D transform styles to consensus flow elements
        const consensusFlows = document.querySelectorAll('.consensus-flow');
        consensusFlows.forEach((flow, index) => {
            this.add3DTransform(flow, index);
        });

        // Add 3D transform styles to formula containers
        const formulas = document.querySelectorAll('.formula-container');
        formulas.forEach((formula, index) => {
            this.add3DTransform(formula, index);
        });
    }

    add3DTransform(element, index) {
        // Add CSS 3D properties
        element.style.transformStyle = 'preserve-3d';
        element.style.perspective = '1000px';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Add hover effects
        element.addEventListener('mouseenter', (e) => {
            this.handle3DHover(e.target, 'enter');
        });

        element.addEventListener('mouseleave', (e) => {
            this.handle3DHover(e.target, 'leave');
        });

        // Add scroll-based 3D effects
        this.addScrollBased3D(element, index);
    }

    handle3DHover(element, action) {
        if (action === 'enter') {
            // Create 3D hover effect
            element.style.transform = 'rotateX(5deg) rotateY(5deg) translateZ(20px)';
            element.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.25)';
            
            // Add floating animation
            this.addFloatingAnimation(element);
        } else {
            // Reset to original state
            element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
            element.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            
            // Remove floating animation
            this.removeFloatingAnimation(element);
        }
    }

    addFloatingAnimation(element) {
        element.style.animation = 'float 3s ease-in-out infinite';
    }

    removeFloatingAnimation(element) {
        element.style.animation = 'none';
    }

    addScrollBased3D(element, index) {
        let ticking = false;
        
        const update3DTransform = () => {
            const rect = element.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distanceFromCenter = centerY - viewportCenter;
            const maxRotation = 15; // degrees
            
            // Calculate rotation based on scroll position
            const rotationX = (distanceFromCenter / viewportCenter) * maxRotation;
            const rotationY = (index % 2 === 0 ? 1 : -1) * Math.abs(rotationX) * 0.5;
            
            // Apply subtle 3D transform
            element.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(${Math.abs(rotationX) * 2}px)`;
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(update3DTransform);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
        window.addEventListener('resize', requestTick);
    }

    setupAnimations() {
        // Add CSS animations
        this.addCSSAnimations();
        
        // Add intersection observer for scroll animations
        this.setupIntersectionObserver();
    }

    addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotateX(5deg) rotateY(5deg) translateZ(20px); }
                50% { transform: translateY(-10px) rotateX(5deg) rotateY(5deg) translateZ(20px); }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .animate-fade-in-up {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            .animate-slide-in-left {
                animation: slideInLeft 0.8s ease-out forwards;
            }
            
            .animate-slide-in-right {
                animation: slideInRight 0.8s ease-out forwards;
            }
            
            .animate-scale-in {
                animation: scaleIn 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('h1, h2, h3, p, pre, table, .blockchain-diagram, .consensus-flow, .formula-container');
        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    }

    animateElement(element) {
        // Add animation class based on element type
        if (element.tagName === 'H1') {
            element.classList.add('animate-fade-in-up');
        } else if (element.tagName === 'H2') {
            element.classList.add('animate-slide-in-left');
        } else if (element.tagName === 'H3') {
            element.classList.add('animate-slide-in-right');
        } else if (element.tagName === 'PRE' || element.tagName === 'TABLE') {
            element.classList.add('animate-scale-in');
        } else if (element.classList.contains('blockchain-diagram')) {
            element.classList.add('animate-scale-in');
        } else if (element.classList.contains('consensus-flow')) {
            element.classList.add('animate-slide-in-left');
        } else if (element.classList.contains('formula-container')) {
            element.classList.add('animate-slide-in-right');
        } else {
            element.classList.add('animate-fade-in-up');
        }
    }

    setupInteractiveDiagrams() {
        // Add interactive features to blockchain diagrams
        this.setupBlockchainDiagrams();
        
        // Add interactive features to consensus flows
        this.setupConsensusFlows();
        
        // Add interactive features to mathematical formulas
        this.setupMathematicalFormulas();
    }

    setupBlockchainDiagrams() {
        const diagrams = document.querySelectorAll('.blockchain-diagram');
        
        diagrams.forEach((diagram) => {
            // Add click interaction
            diagram.addEventListener('click', (e) => {
                this.handleDiagramClick(e.target);
            });

            // Add keyboard navigation
            diagram.addEventListener('keydown', (e) => {
                this.handleDiagramKeydown(e);
            });

            // Make diagrams focusable
            diagram.setAttribute('tabindex', '0');
            diagram.setAttribute('role', 'button');
            diagram.setAttribute('aria-label', 'Interactive blockchain diagram');
        });
    }

    setupConsensusFlows() {
        const flows = document.querySelectorAll('.consensus-flow');
        
        flows.forEach((flow) => {
            // Add step-by-step animation
            flow.addEventListener('click', (e) => {
                this.animateConsensusFlow(e.target);
            });

            // Add progress indicator
            this.addProgressIndicator(flow);
        });
    }

    setupMathematicalFormulas() {
        const formulas = document.querySelectorAll('.formula-container');
        
        formulas.forEach((formula) => {
            // Add formula explanation on hover
            formula.addEventListener('mouseenter', (e) => {
                this.showFormulaExplanation(e.target);
            });

            formula.addEventListener('mouseleave', (e) => {
                this.hideFormulaExplanation(e.target);
            });

            // Add copy functionality
            this.addCopyFunctionality(formula);
        });
    }

    handleDiagramClick(diagram) {
        // Toggle expanded view
        if (diagram.classList.contains('expanded')) {
            diagram.classList.remove('expanded');
            diagram.style.transform = 'rotateX(5deg) rotateY(5deg) translateZ(20px)';
        } else {
            diagram.classList.add('expanded');
            diagram.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(50px) scale(1.1)';
        }
    }

    handleDiagramKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleDiagramClick(event.target);
        }
    }

    animateConsensusFlow(flow) {
        // Animate through consensus steps
        const steps = flow.querySelectorAll('.consensus-step');
        let currentStep = 0;

        const animateStep = () => {
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
                setTimeout(animateStep, 500);
            }
        };

        animateStep();
    }

    addProgressIndicator(flow) {
        const progressBar = document.createElement('div');
        progressBar.className = 'consensus-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        flow.appendChild(progressBar);
    }

    showFormulaExplanation(formula) {
        // Create tooltip with formula explanation
        const tooltip = document.createElement('div');
        tooltip.className = 'formula-tooltip';
        tooltip.textContent = this.getFormulaExplanation(formula);
        
        formula.appendChild(tooltip);
        
        // Position tooltip
        const rect = formula.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${rect.height + 10}px`;
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
    }

    hideFormulaExplanation(formula) {
        const tooltip = formula.querySelector('.formula-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    getFormulaExplanation(formula) {
        // Return explanation based on formula content
        const text = formula.textContent;
        if (text.includes('Merkle')) {
            return 'Merkle Tree: Cryptographic data structure for efficient verification';
        } else if (text.includes('PoW')) {
            return 'Proof of Work: Consensus mechanism requiring computational effort';
        } else if (text.includes('PoS')) {
            return 'Proof of Stake: Consensus mechanism based on token ownership';
        } else {
            return 'Mathematical formula for blockchain operations';
        }
    }

    addCopyFunctionality(formula) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-formula-btn';
        copyButton.innerHTML = '📋';
        copyButton.setAttribute('aria-label', 'Copy formula');
        
        copyButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.copyFormulaToClipboard(formula);
        });
        
        formula.appendChild(copyButton);
    }

    async copyFormulaToClipboard(formula) {
        try {
            const text = formula.textContent.replace('📋', '').trim();
            await navigator.clipboard.writeText(text);
            
            // Show success feedback
            this.showCopyFeedback(formula, true);
        } catch (err) {
            this.showCopyFeedback(formula, false);
        }
    }

    showCopyFeedback(formula, success) {
        const feedback = document.createElement('div');
        feedback.className = `copy-feedback ${success ? 'success' : 'error'}`;
        feedback.textContent = success ? 'Copied!' : 'Failed to copy';
        
        formula.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    setupMathematicalVisualizations() {
        // Add interactive mathematical visualizations
        this.setupGraphVisualizations();
        this.setupNetworkDiagrams();
        this.setupCryptographicVisualizations();
    }

    setupGraphVisualizations() {
        // Create interactive graphs for mathematical concepts
        const graphContainers = document.querySelectorAll('.math-graph');
        
        graphContainers.forEach((container) => {
            this.createInteractiveGraph(container);
        });
    }

    setupNetworkDiagrams() {
        // Create interactive network topology diagrams
        const networkContainers = document.querySelectorAll('.network-diagram');
        
        networkContainers.forEach((container) => {
            this.createNetworkDiagram(container);
        });
    }

    setupCryptographicVisualizations() {
        // Create interactive cryptographic process visualizations
        const cryptoContainers = document.querySelectorAll('.crypto-visualization');
        
        cryptoContainers.forEach((container) => {
            this.createCryptoVisualization(container);
        });
    }

    createInteractiveGraph(container) {
        // Create canvas for graph visualization
        const canvas = document.createElement('canvas');
        canvas.width = container.offsetWidth;
        canvas.height = 300;
        container.appendChild(canvas);
        
        // Add graph interaction logic here
        this.drawSampleGraph(canvas);
    }

    createNetworkDiagram(container) {
        // Create interactive network topology
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '400');
        container.appendChild(svg);
        
        // Add network visualization logic here
        this.drawSampleNetwork(svg);
    }

    createCryptoVisualization(container) {
        // Create cryptographic process visualization
        const canvas = document.createElement('canvas');
        canvas.width = container.offsetWidth;
        canvas.height = 250;
        container.appendChild(canvas);
        
        // Add crypto visualization logic here
        this.drawSampleCryptoProcess(canvas);
    }

    drawSampleGraph(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Draw sample mathematical function
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
            const xVal = (x - width / 2) / 50;
            const y = height / 2 - Math.sin(xVal) * 50;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    }

    drawSampleNetwork(svg) {
        // Draw sample network topology
        const nodes = [
            { x: 100, y: 100, label: 'Node A' },
            { x: 300, y: 100, label: 'Node B' },
            { x: 200, y: 200, label: 'Node C' }
        ];
        
        nodes.forEach((node, index) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', '20');
            circle.setAttribute('fill', '#000000');
            svg.appendChild(circle);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 40);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#000000');
            text.textContent = node.label;
            svg.appendChild(text);
        });
        
        // Draw connections
        const connections = [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 0 }
        ];
        
        connections.forEach((conn) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', nodes[conn.from].x);
            line.setAttribute('y1', nodes[conn.from].y);
            line.setAttribute('x2', nodes[conn.to].x);
            line.setAttribute('y2', nodes[conn.to].y);
            line.setAttribute('stroke', '#000000');
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);
        });
    }

    drawSampleCryptoProcess(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Draw sample cryptographic process
        ctx.fillStyle = '#000000';
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        
        const steps = ['Input', 'Hash', 'Output'];
        const stepWidth = width / steps.length;
        
        steps.forEach((step, index) => {
            const x = stepWidth * index + stepWidth / 2;
            const y = height / 2;
            
            // Draw box
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.strokeRect(x - 40, y - 30, 80, 60);
            
            // Draw text
            ctx.fillText(step, x, y + 5);
            
            // Draw arrow
            if (index < steps.length - 1) {
                ctx.beginPath();
                ctx.moveTo(x + 40, y);
                ctx.lineTo(x + stepWidth - 40, y);
                ctx.lineTo(x + stepWidth - 50, y - 5);
                ctx.moveTo(x + stepWidth - 40, y);
                ctx.lineTo(x + stepWidth - 50, y + 5);
                ctx.stroke();
            }
        });
    }

    setupScrollEffects() {
        // Add parallax and scroll-triggered effects
        this.setupParallaxEffects();
        this.setupScrollTriggers();
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element) => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupScrollTriggers() {
        // Add scroll-triggered animations
        const scrollTriggers = document.querySelectorAll('[data-scroll-trigger]');
        
        scrollTriggers.forEach((trigger) => {
            const animation = trigger.dataset.scrollTrigger;
            const threshold = trigger.dataset.threshold || 0.5;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animation);
                    }
                });
            }, { threshold });
            
            observer.observe(trigger);
        });
    }
}

// Initialize 3D interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RSCChain3DInteractions();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RSCChain3DInteractions;
}
