
const mobileTouch = () => {
    const containers = document.querySelectorAll('.part-container');

    containers.forEach(container => {
        container.addEventListener('click', function(){
            
            const lastTouched = document.querySelector('.part-container.touched');
            
            if(lastTouched){
                lastTouched.classList.remove('touched');
            }

            this.classList.add('touched');
        })
    })

    
};

export default mobileTouch;
