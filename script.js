// Sound System Class
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.volume = 0.5;
        this.enabled = true;
        this.initializeAudioContext();
        this.createSounds();
    }

    initializeAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported, falling back to HTML5 audio');
            this.audioContext = null;
        }
    }

    createSounds() {
        // Create synthetic sounds using Web Audio API
        this.sounds = {
            click: this.createTone(800, 0.1, 'sine'),
            thinking: this.createTone(400, 0.3, 'triangle'),
            win: this.createChord([523, 659, 784], 0.5), // C major chord
            lose: this.createTone(200, 0.5, 'sawtooth'),
            tie: this.createTone(440, 0.3, 'square'),
            victory: this.createVictorySound(),
            defeat: this.createDefeatSound(),
            ambient: this.createAmbientSound()
        };
    }

    createTone(frequency, duration, type = 'sine') {
        return () => {
            if (!this.audioContext || !this.enabled) return;

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }

    createChord(frequencies, duration) {
        return () => {
            if (!this.audioContext || !this.enabled) return;

            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);

                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sine';

                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + duration);
                }, index * 100);
            });
        };
    }

    createVictorySound() {
        return () => {
            if (!this.audioContext || !this.enabled) return;

            const notes = [523, 659, 784, 1047]; // C, E, G, C (octave)
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);

                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sine';

                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);

                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.3);
                }, index * 150);
            });
        };
    }

    createDefeatSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return;

            const frequencies = [400, 350, 300, 250];
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);

                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sawtooth';

                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);

                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.4);
                }, index * 200);
            });
        };
    }

    createAmbientSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return;

            // Create a subtle ambient drone
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(110, this.audioContext.currentTime);
            oscillator.type = 'sine';
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, this.audioContext.currentTime);

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.05, this.audioContext.currentTime + 2);

            oscillator.start(this.audioContext.currentTime);

            return { oscillator, gainNode };
        };
    }

    play(soundName) {
        if (this.sounds[soundName] && this.enabled) {
            // Resume audio context if suspended (required by some browsers)
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            this.sounds[soundName]();
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }
}

// Rock Paper Scissors Game Logic
class RockPaperScissorsGame {
    constructor() {
        // Game state
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 1;
        this.maxRounds = 5;
        this.gameEnded = false;

        // Game choices
        this.choices = ['rock', 'paper', 'scissors'];
        this.choiceEmojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
        };

        // Settings
        this.settings = {
            animations: true,
            sounds: true,
            volume: 0.5
        };

        // Initialize systems
        this.soundSystem = new SoundSystem();

        // DOM elements
        this.initializeElements();

        // Event listeners
        this.setupEventListeners();

        // Initialize theme and settings
        this.initializeTheme();
        this.initializeSettings();
    }
    
    initializeElements() {
        // Score elements
        this.playerScoreElement = document.getElementById('player-score');
        this.computerScoreElement = document.getElementById('computer-score');
        this.currentRoundElement = document.getElementById('current-round');
        
        // Choice display elements
        this.playerChoiceDisplay = document.getElementById('player-choice-display');
        this.computerChoiceDisplay = document.getElementById('computer-choice-display');
        
        // Button elements
        this.rockBtn = document.getElementById('rock-btn');
        this.paperBtn = document.getElementById('paper-btn');
        this.scissorsBtn = document.getElementById('scissors-btn');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.themeToggle = document.getElementById('theme-toggle');
        
        // Result elements
        this.roundResult = document.getElementById('round-result');
        this.gameResult = document.getElementById('game-result');
        
        // All choice buttons
        this.choiceButtons = [this.rockBtn, this.paperBtn, this.scissorsBtn];

        // Settings elements
        this.settingsToggle = document.getElementById('settings-toggle');
        this.settingsPanel = document.getElementById('settings-panel');
        this.animationsToggle = document.getElementById('animations-toggle');
        this.soundsToggle = document.getElementById('sounds-toggle');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeDisplay = document.getElementById('volume-display');
        this.confettiContainer = document.getElementById('confetti-container');
    }
    
    setupEventListeners() {
        // Choice button listeners
        this.choiceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (!this.gameEnded) {
                    const choice = e.currentTarget.dataset.choice;
                    this.playRound(choice);
                }
            });
        });
        
        // Play again button listener
        this.playAgainBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        // Theme toggle listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Settings listeners
        this.settingsToggle.addEventListener('click', () => {
            this.toggleSettingsPanel();
        });

        this.animationsToggle.addEventListener('click', () => {
            this.toggleAnimations();
        });

        this.soundsToggle.addEventListener('click', () => {
            this.toggleSounds();
        });

        this.volumeSlider.addEventListener('input', (e) => {
            this.updateVolume(e.target.value);
        });

        // Close settings panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.settingsPanel.contains(e.target) && !this.settingsToggle.contains(e.target)) {
                this.settingsPanel.classList.remove('open');
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.gameEnded) return;
            
            switch(e.key.toLowerCase()) {
                case 'r':
                    this.playRound('rock');
                    break;
                case 'p':
                    this.playRound('paper');
                    break;
                case 's':
                    this.playRound('scissors');
                    break;
            }
        });
    }
    
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }
    
    updateThemeIcon(theme) {
        const themeIcon = document.getElementById('theme-icon');
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    initializeSettings() {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('gameSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }

        // Apply settings to UI
        this.animationsToggle.classList.toggle('active', this.settings.animations);
        this.animationsToggle.setAttribute('aria-checked', this.settings.animations);

        this.soundsToggle.classList.toggle('active', this.settings.sounds);
        this.soundsToggle.setAttribute('aria-checked', this.settings.sounds);

        this.volumeSlider.value = this.settings.volume * 100;
        this.volumeDisplay.textContent = Math.round(this.settings.volume * 100) + '%';

        // Apply settings to systems
        this.soundSystem.setEnabled(this.settings.sounds);
        this.soundSystem.setVolume(this.settings.volume);

        // Apply animation preferences
        if (!this.settings.animations) {
            document.body.classList.add('no-animations');
        }
    }

    saveSettings() {
        localStorage.setItem('gameSettings', JSON.stringify(this.settings));
    }

    toggleSettingsPanel() {
        this.settingsPanel.classList.toggle('open');
    }

    toggleAnimations() {
        this.settings.animations = !this.settings.animations;
        this.animationsToggle.classList.toggle('active', this.settings.animations);
        this.animationsToggle.setAttribute('aria-checked', this.settings.animations);

        document.body.classList.toggle('no-animations', !this.settings.animations);
        this.saveSettings();
    }

    toggleSounds() {
        this.settings.sounds = !this.settings.sounds;
        this.soundsToggle.classList.toggle('active', this.settings.sounds);
        this.soundsToggle.setAttribute('aria-checked', this.settings.sounds);

        this.soundSystem.setEnabled(this.settings.sounds);
        this.saveSettings();
    }

    updateVolume(value) {
        this.settings.volume = value / 100;
        this.volumeDisplay.textContent = value + '%';
        this.soundSystem.setVolume(this.settings.volume);
        this.saveSettings();
    }

    createConfetti() {
        if (!this.settings.animations) return;

        const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--success-color)'];

        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            this.confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }

    createMegaConfetti() {
        if (!this.settings.animations) return;

        const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--success-color)', '#ffd700', '#ff6b6b'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
            confetti.style.width = (Math.random() * 8 + 6) + 'px';
            confetti.style.height = (Math.random() * 8 + 6) + 'px';

            this.confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 6000);
        }
    }

    addSparkles(element) {
        if (!this.settings.animations) return;

        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-container';

        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkleContainer.appendChild(sparkle);
        }

        element.style.position = 'relative';
        element.appendChild(sparkleContainer);

        // Remove sparkles after animation
        setTimeout(() => {
            if (sparkleContainer.parentNode) {
                sparkleContainer.parentNode.removeChild(sparkleContainer);
            }
        }, 1000);
    }
    
    generateComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }
    
    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }
        
        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };
        
        return winConditions[playerChoice] === computerChoice ? 'player' : 'computer';
    }
    
    updateChoiceDisplays(playerChoice, computerChoice) {
        // Update player choice display with animation
        this.playerChoiceDisplay.textContent = this.choiceEmojis[playerChoice];
        this.playerChoiceDisplay.setAttribute('aria-label', `You chose ${playerChoice}`);

        if (this.settings.animations) {
            this.playerChoiceDisplay.classList.add('scale-reveal');
            setTimeout(() => {
                this.playerChoiceDisplay.classList.remove('scale-reveal');
            }, 800);
        }

        // Update computer choice display with thinking animation
        this.computerChoiceDisplay.textContent = '🤔';
        this.computerChoiceDisplay.setAttribute('aria-label', 'Computer is thinking...');

        if (this.settings.animations) {
            this.computerChoiceDisplay.classList.add('shake');
        }

        // Play thinking sound
        this.soundSystem.play('thinking');

        // Animate computer choice reveal
        setTimeout(() => {
            this.computerChoiceDisplay.classList.remove('shake');
            this.computerChoiceDisplay.textContent = this.choiceEmojis[computerChoice];
            this.computerChoiceDisplay.setAttribute('aria-label', `Computer chose ${computerChoice}`);

            if (this.settings.animations) {
                this.computerChoiceDisplay.classList.add('scale-reveal');
                setTimeout(() => {
                    this.computerChoiceDisplay.classList.remove('scale-reveal');
                }, 800);
            }
        }, 1000);
    }
    
    updateScores() {
        this.playerScoreElement.textContent = this.playerScore;
        this.computerScoreElement.textContent = this.computerScore;
        this.currentRoundElement.textContent = this.currentRound;
    }
    
    displayRoundResult(result, playerChoice, computerChoice) {
        let resultText = '';
        let resultClass = '';

        switch(result) {
            case 'player':
                resultText = `You win this round! ${this.choiceEmojis[playerChoice]} beats ${this.choiceEmojis[computerChoice]}`;
                resultClass = 'win';
                this.soundSystem.play('win');
                if (this.settings.animations) {
                    this.createConfetti();
                    this.addSparkles(this.playerChoiceDisplay);
                    this.playerChoiceDisplay.classList.add('pulse-winner');
                    setTimeout(() => {
                        this.playerChoiceDisplay.classList.remove('pulse-winner');
                    }, 2000);
                }
                break;
            case 'computer':
                resultText = `Computer wins this round! ${this.choiceEmojis[computerChoice]} beats ${this.choiceEmojis[playerChoice]}`;
                resultClass = 'lose';
                this.soundSystem.play('lose');
                if (this.settings.animations) {
                    this.computerChoiceDisplay.classList.add('pulse-winner');
                    setTimeout(() => {
                        this.computerChoiceDisplay.classList.remove('pulse-winner');
                    }, 2000);
                }
                break;
            case 'tie':
                resultText = `It's a tie! Both chose ${this.choiceEmojis[playerChoice]}`;
                resultClass = 'tie';
                this.soundSystem.play('tie');
                break;
        }

        this.roundResult.textContent = resultText;
        this.roundResult.className = `round-result ${resultClass}`;
        this.roundResult.setAttribute('aria-live', 'polite');

        if (this.settings.animations) {
            this.roundResult.classList.add('slide-in-up');
            setTimeout(() => {
                this.roundResult.classList.remove('slide-in-up');
            }, 600);
        }
    }
    
    displayFinalResult() {
        let finalText = '';
        let finalClass = '';

        if (this.playerScore > this.computerScore) {
            finalText = '🎉 Congratulations! You Won The Game! 🎉';
            finalClass = 'final-win';
            this.soundSystem.play('victory');
            if (this.settings.animations) {
                this.createMegaConfetti();
            }
        } else if (this.computerScore > this.playerScore) {
            finalText = '💻 Game Over! Computer Wins The Game! 💻';
            finalClass = 'final-lose';
            this.soundSystem.play('defeat');
        } else {
            finalText = '🤝 It\'s a Tie Game! Try Again! 🤝';
            finalClass = 'final-tie';
            this.soundSystem.play('tie');
        }

        this.gameResult.textContent = finalText;
        this.gameResult.className = `game-result ${finalClass}`;
        this.gameResult.classList.remove('hidden');

        if (this.settings.animations) {
            this.gameResult.classList.add('bounce-in');
            setTimeout(() => {
                this.gameResult.classList.remove('bounce-in');
            }, 800);
        }

        this.playAgainBtn.classList.remove('hidden');
        if (this.settings.animations) {
            setTimeout(() => {
                this.playAgainBtn.classList.add('bounce-in');
                setTimeout(() => {
                    this.playAgainBtn.classList.remove('bounce-in');
                }, 800);
            }, 400);
        }

        // Hide round result
        this.roundResult.style.display = 'none';

        // Disable choice buttons
        this.choiceButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        });
    }
    
    addButtonFeedback(selectedChoice) {
        // Play click sound
        this.soundSystem.play('click');

        // Remove previous selections
        this.choiceButtons.forEach(button => {
            button.classList.remove('selected');
        });

        // Add selection to clicked button
        const selectedButton = this.choiceButtons.find(button =>
            button.dataset.choice === selectedChoice
        );
        if (selectedButton) {
            selectedButton.classList.add('selected');

            // Add haptic feedback simulation
            selectedButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                selectedButton.style.transform = '';
            }, 150);

            // Remove selection after animation
            setTimeout(() => {
                selectedButton.classList.remove('selected');
            }, 2000);
        }
    }
    
    playRound(playerChoice) {
        // Add visual feedback
        this.addButtonFeedback(playerChoice);
        
        // Generate computer choice
        const computerChoice = this.generateComputerChoice();
        
        // Update choice displays
        this.updateChoiceDisplays(playerChoice, computerChoice);
        
        // Determine winner after computer choice is revealed
        setTimeout(() => {
            const result = this.determineWinner(playerChoice, computerChoice);
            
            // Update scores
            if (result === 'player') {
                this.playerScore++;
            } else if (result === 'computer') {
                this.computerScore++;
            }
            
            // Display round result
            this.displayRoundResult(result, playerChoice, computerChoice);
            
            // Update UI
            this.updateScores();
            
            // Check if game is over
            if (this.currentRound >= this.maxRounds) {
                this.gameEnded = true;
                setTimeout(() => {
                    this.displayFinalResult();
                }, 1500);
            } else {
                this.currentRound++;
                this.updateScores();
            }
        }, 1200);
    }
    
    resetGame() {
        // Reset game state
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 1;
        this.gameEnded = false;
        
        // Reset UI elements
        this.updateScores();
        this.playerChoiceDisplay.textContent = '?';
        this.computerChoiceDisplay.textContent = '?';
        this.playerChoiceDisplay.setAttribute('aria-label', 'Your choice will appear here');
        this.computerChoiceDisplay.setAttribute('aria-label', 'Computer choice will appear here');
        
        // Reset result displays
        this.roundResult.textContent = '';
        this.roundResult.className = 'round-result';
        this.roundResult.style.display = 'block';
        this.gameResult.classList.add('hidden');
        this.playAgainBtn.classList.add('hidden');
        
        // Re-enable choice buttons
        this.choiceButtons.forEach(button => {
            button.disabled = false;
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
            button.classList.remove('selected');
        });
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new RockPaperScissorsGame();
    
    // Add some initial instructions
    const roundResult = document.getElementById('round-result');
    roundResult.textContent = 'Choose Rock, Paper, or Scissors to start the game! (You can also use R, P, S keys)';
    roundResult.className = 'round-result';
});
