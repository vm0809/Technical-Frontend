// script.js
class BOGODeal {
    constructor() {
        this.selectedOption = '2-unit';
        this.selectedSize = '#1';
        this.selectedColor = 'Black';
        this.init();
    }

    init() {
        this.setupOptionSelection();
        this.setupSizeSelection();
        this.setupColorSelection();
        this.updateTotalPrice();
        
        // Set initial selections
        this.setInitialSelections();
    }

    setInitialSelections() {
        // Set initial size selection
        const initialSizeBtn = document.querySelector('.size-btn');
        if (initialSizeBtn) {
            initialSizeBtn.classList.add('active');
            this.selectedSize = initialSizeBtn.textContent;
        }
        
        // Set initial color selection
        const initialColorChoice = document.querySelector('.color-choice');
        if (initialColorChoice) {
            initialColorChoice.classList.add('selected');
            this.selectedColor = initialColorChoice.querySelector('.color-label').textContent;
        }
    }

    setupOptionSelection() {
        const options = document.querySelectorAll('.option');
        
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                if (e.target.closest('.size-btn') || e.target.closest('.color-choice')) {
                    return;
                }
                
                this.selectOption(option);
            });
        });
    }

    setupSizeSelection() {
        const sizeButtons = document.querySelectorAll('.size-btn');
        
        sizeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Remove active class from all size buttons in the same group
                const parent = button.closest('.size-buttons');
                parent.querySelectorAll('.size-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                this.selectedSize = button.textContent;
                
                console.log('Selected size:', this.selectedSize);
                this.updateTotalPrice();
            });
        });
    }

    setupColorSelection() {
        const colorChoices = document.querySelectorAll('.color-choice');
        
        colorChoices.forEach(choice => {
            choice.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Remove selected class from all color choices in the same group
                const parent = choice.closest('.color-selection');
                parent.querySelectorAll('.color-choice').forEach(c => {
                    c.classList.remove('selected');
                });
                
                // Add selected class to clicked choice
                choice.classList.add('selected');
                this.selectedColor = choice.querySelector('.color-label').textContent;
                
                console.log('Selected color:', this.selectedColor);
            });
        });
    }

    selectOption(option) {
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        option.classList.add('active');
        const units = option.querySelector('.units').textContent;
        this.selectedOption = units.toLowerCase().replace(' ', '-');
        
        this.updateTotalPrice();
    }

    updateTotalPrice() {
        const prices = {
            '1-unit': 24.00,
            '2-unit': 18.00,
            '3-unit': 24.00
        };
        
        const totalPrice = prices[this.selectedOption] || 18.00;
        const totalElement = document.querySelector('.total-price');
        totalElement.textContent = `$${totalPrice.toFixed(2)} USD`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BOGODeal();
    
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCartBtn.textContent = 'Adding to Cart...';
        addToCartBtn.style.opacity = '0.8';
        
        setTimeout(() => {
            addToCartBtn.textContent = 'Added to Cart!';
            addToCartBtn.style.background = 'linear-gradient(135deg, #96CEB4, #4ECDC4)';
            
            setTimeout(() => {
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.style.background = 'linear-gradient(135deg, #FF6B6B, #4ECDC4)';
                addToCartBtn.style.opacity = '1';
            }, 1500);
        }, 1000);
    });
});