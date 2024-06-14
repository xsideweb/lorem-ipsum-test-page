document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".blog__section");
    const thumb = document.querySelector(".scrollbar .thumb");
    const scrollbar = document.querySelector(".scrollbar");

    function updateThumbPosition() {
        const sectionHeight = section.scrollHeight;
        const sectionVisibleHeight = section.clientHeight;
        const sectionScrollTop = section.scrollTop;

        const thumbHeight = thumb.clientHeight;
        const scrollbarHeight = scrollbar.clientHeight;

        const maxScrollTop = sectionHeight - sectionVisibleHeight;
        const maxThumbTop = scrollbarHeight - thumbHeight;

        const thumbTop = (sectionScrollTop / maxScrollTop) * maxThumbTop;

        thumb.style.top = `${thumbTop}px`;
    }

    section.addEventListener("scroll", updateThumbPosition);

    updateThumbPosition();

    thumb.onmousedown = function (event) {
        event.preventDefault();

        const startY = event.clientY;
        const thumbRect = thumb.getBoundingClientRect();
        const scrollbarRect = scrollbar.getBoundingClientRect();
        const startTop = thumbRect.top - scrollbarRect.top;

        const onMouseMove = (event) => {
            const deltaY = event.clientY - startY;
            const newTop = Math.min(Math.max(startTop + deltaY, 0), scrollbarRect.height - thumbRect.height);

            thumb.style.top = `${newTop}px`;

            const sectionHeight = section.scrollHeight;
            const sectionVisibleHeight = section.clientHeight;
            const maxScrollTop = sectionHeight - sectionVisibleHeight;
            const maxThumbTop = scrollbarRect.height - thumbRect.height;

            const thumbRatio = newTop / maxThumbTop;
            section.scrollTop = thumbRatio * maxScrollTop;
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const currentLang = document.querySelector('.lang__item-current');
    const dropdown = document.querySelector('.dropdown');
    const langItems = document.querySelectorAll('.lang__item');
    const headerToggle = document.querySelector('.header__toggle');
    const headerNav = document.querySelector('.header__nav nav');
    const overlay = document.querySelector('.main');
    const body = document.body;

    currentLang.addEventListener('click', function(event) {
        event.preventDefault();
        dropdown.classList.toggle('show');
    });

    headerToggle.addEventListener('click', function(event) {
        document.querySelector('body').classList.toggle('menu-open');
        this.classList.toggle('open');
        headerNav.classList.toggle('active');
        overlay.classList.toggle('overlay');
    })

    langItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedLang = this.querySelector('span').textContent;
            currentLang.innerHTML = this.innerHTML;

            body.classList = 'lang-' + selectedLang;

            dropdown.classList.remove('show');
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.lang')) {
            dropdown.classList.remove('show');
        }
    });
});
