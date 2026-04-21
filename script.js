document.addEventListener('DOMContentLoaded', function() {

    // 🎵 --- Background Music Fix ---

    window.toggleMusic = function () {
    const music = document.getElementById("bg-music");
    const btn = document.querySelector("button[onclick='toggleMusic()']");

    if (music.paused) {
        music.play();
        if (btn) btn.innerHTML = "⏸️ Pause Music";
    } else {
        music.pause();
        if (btn) btn.innerHTML = "▶️ Play Music";
    }
};

    function startMusic() {
    if (music) {
        music.volume = 0.5;
        music.play().then(() => {
            const btn = document.querySelector("button[onclick='toggleMusic()']");
            if (btn) btn.innerHTML = "⏸️ Pause Music";
        }).catch(() => {});
    }
}

    // Play music on first user interaction
    document.body.addEventListener("click", startMusic, { once: true });
    document.body.addEventListener("scroll", startMusic, { once: true });


    // --- Live Age Counter ---
    const birthDate = new Date('1999-07-12T00:00:00');
    const countdownElement = document.getElementById('countdown');

    function updateAge() {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        countdownElement.innerHTML = `${years}y ${months}m ${days}d <br> ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateAge, 1000);
    updateAge();


    // --- Initialize AOS ---
    AOS.init({
        duration: 800,
        once: true,
    });


    // --- Initialize LightGallery ---
    const gallery = document.getElementById('lightgallery2');
    if (gallery) {
        lightGallery(gallery, {
            speed: 500,
            download: false,
            closable: true,
            showCloseIcon: true,
            mobileSettings: {
                controls: true,
                showCloseIcon: true
            }
        });
    }


    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
            }

            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(
                this.x + this.w / 2, this.y - this.h / 2,
                this.x + this.w, this.y,
                this.x + this.w / 2, this.y + this.h / 2
            );
            ctx.bezierCurveTo(
                this.x, this.y + this.h,
                this.x - this.w / 2, this.y,
                this.x, this.y
            );
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => petal.update());
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }

});