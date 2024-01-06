import Image from "next/image";

export default function ImageOverlay({ image, color, reverse }: { image: string, color: string, reverse: boolean }) {
    return (<>
        <Image className={`${reverse ? "-scale-x-100" : ""}`} alt="" fill={true} src={image}></Image>
        <div className={`absolute w-full h-full bg-black opacity-25`}></div> 
        <div className={`absolute w-full h-full ${color} mix-blend-color bg-cover`}>
        </div>
    </>);
}