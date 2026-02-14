"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./page.css";

export default function Page() {
    const envelopeRef = useRef<HTMLDivElement | null>(null);
    const heartsRef = useRef<HTMLDivElement | null>(null);
    const yayRef = useRef<HTMLDivElement | null>(null);
    const noBtnRef = useRef<HTMLButtonElement | null>(null);
    const [opened, setOpened] = useState<boolean>(false);
    const speedRef = useRef<number>(500);

    useEffect(() => {
        const envelope = envelopeRef.current;
        const yesBtn = document.getElementById("yesBtn") as HTMLButtonElement | null;
        const noBtn = noBtnRef.current;
        const heartsContainer = heartsRef.current;
        const yayContainer = yayRef.current;

        if (!envelope || !yesBtn || !noBtn || !heartsContainer || !yayContainer)
            return;

        const createHeart = () => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = "❤";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDelay = Math.random() * 2 + "s";
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 8000);
        };

        const handleEnvelopeClick = () => {
            if (!opened) {
                envelope.classList.add("open");
                setOpened(true);
            }
        };

        let animationFrame: number;
        type MovingImage = {
            x: number;
            y: number;
            dx: number;
            dy: number;
        }

        const images: MovingImage[] = Array.from({ length: 3 }).map(() => ({
            x: Math.random() * 300,
            y: Math.random() * 300,
            dx: Math.random() * 6 + 2,
            dy: Math.random() * 6 + 2,
        }));

        const moveYay = () => {
            const elements = document.querySelectorAll(
                ".yay-item"
            ) as NodeListOf<HTMLDivElement>;

            elements.forEach((element, index) => {
                const img = images[index];
                if(!img) return;

                const rect = element.getBoundingClientRect();

                if(rect.right >= window.innerWidth || rect.left <= 0) {
                    img.dx = -img.dx;
                }

                if(rect.bottom >= window.innerHeight || rect.top <= 0) {
                    img.dy = -img.dy;
                }
                img.x += img.dx;
                img.y += img.dy;

                const roundedX = Math.round(img.x);
                const roundedY = Math.round(img.y);

                element.style.transform = `translate(${roundedX}px, ${roundedY}px)`;

            })
            animationFrame = requestAnimationFrame(moveYay);
        };

        const handleYesClick = () => {
            envelope.style.display = "none";
            heartsContainer.style.display = "none";
            yayContainer.style.display = "block";

            moveYay();
            setInterval(createHeart, 300);
        };

        const handleNoHover = () => {
            const maxX = window.innerWidth - noBtn.offsetWidth;
            const maxY = window.innerHeight - noBtn.offsetHeight;
            const x = Math.random() * maxX;
            const y = Math.random() * maxY;
            noBtn.style.transition = `all ${speedRef.current}ms ease`;
            noBtn.style.position = "fixed";
            noBtn.style.left = x + "px";
            noBtn.style.top = y + "px";
            speedRef.current = Math.max(100, speedRef.current - 50);
        };

        envelope.addEventListener("click", handleEnvelopeClick);
        yesBtn.addEventListener("click", handleYesClick);
        noBtn.addEventListener("mouseover", handleNoHover);

        const heartInterval = setInterval(createHeart, 500);

        return () => {
            envelope.removeEventListener("click", handleEnvelopeClick);
            yesBtn.removeEventListener("click", handleYesClick);
            noBtn.removeEventListener("mouseover", handleNoHover);
            clearInterval(heartInterval);
            cancelAnimationFrame(animationFrame);
        };
    }, [opened]);

    return (
        <div className="flex justify-center">
            <div className="envelope" ref={envelopeRef}>
                <div className="envelope-front caveat-1">
                For Ally!
                <div className="stamp"></div>
                </div>

                <div className="card">
                    <div className="container">
                        <h1>
                            Will You <br />
                            Be My <br />
                            Valentine?
                        </h1>

                        <div className="buttons">
                            <button id="yesBtn">YES!</button>
                            <button id="noBtn" ref={noBtnRef}>
                                no
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        <div className="hearts" ref={heartsRef}></div>

        <div id="yay-container" ref={yayRef}>
            {["/chimuelo.jpg", "/capy.jpeg", "/pica.jpeg"].map((src, index) => (
                <div key={index} className="yay-item" style={{ position: "fixed" }}>
                <Image
                    src={src}
                    alt="Celebration Image"
                    width={200}
                    height={100}
                />
                </div>
            ))}

            <h2>
                Happy Valentines Pookie! <br />
                (i wuv you baby!)
            </h2>
        </div>
        </div>
    );
}
