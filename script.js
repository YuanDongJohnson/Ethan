  <script>
        const items = document.querySelectorAll('.carousel-item');
        // 当前显示的第几张轮播图
        let index = 3;

        function layout() {
            // 图片之间的间隔
            const xOffsetStep = 100;
            // 两张轮播图之间的递减缩放倍率
            const scaleStep = 0.6;
            // 两张轮播图之间的透明度递减倍率
            const opacityStep = 0.5;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                // 计算每张图片i距离当前图片index之间间隔几张
                const dis = Math.abs(i - index);
                // 返回1，-1，0，-0，当做一个正负号
                const sign = Math.sign(i - index);

                let xOffset = (i - index) * xOffsetStep;
                // 每张图片的初始偏移量，解决初始偏移距离太小的问题
                if (i !== index) {
                    // sign为正数，右边的每张图片加上100的偏移量；
                    // sign为负数，左边的每张图片减去100的偏移量。
                    xOffset = xOffset + 100 * sign;
                }
                // 每张图片缩放倍数
                const scale = scaleStep ** dis;
                // 如果是当前的不旋转，否则左边旋转45度，右边旋转-45度
                const rotateY = i === index ? 0 : 45 * -sign;
                item.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
                // scale同理，每张图片的透明度，越远透明度越小
                const opacity = opacityStep ** dis;
                item.style.opacity = opacity;
                // 设置每张图片的层级，距离当前index越远的，层级越低
                const zIndex = items.length - dis;
                item.style.zIndex = zIndex;
            }
        }

        layout();

        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');

        prev.addEventListener('click', () => {
            index--;
            if (index < 0) {
                index = 0;
            }
            layout();
        })
        next.addEventListener('click', () => {
            index++;
            if (index > items.length - 1) {
                index = items.length - 1;
            }
            layout();
        })

        // 点击图片切换
        items.forEach((item, i) => {
            item.addEventListener('click', () => {
                index = i;
                layout()
            })
        })
    </script>
