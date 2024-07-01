import Slider from 'react-slick';
import Button from '../../Button';

const HeroSlide = [
    {
        id:1,
        img: "https://via.placeholder.com/1080",
        subtitle: "Lorem, ipsum dolor.",
        title1: "Lorem, ipsum dolor.",
        title2: "title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis fugit mollitia eius. Explicabo, debitis nulla deleniti laboriosam magni numquam.",
    },
    {
        id:2,
        img: "https://via.placeholder.com/1080",
        subtitle: "Lorem, ipsum dolor.",
        title1: "Lorem, ipsum dolor.",
        title2: "title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis fugit mollitia eius. Explicabo, debitis nulla deleniti laboriosam magni numquam.",
    }
    
]

function Hero() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplaySpeed: 4000, // Corrected from 'autoplayspeed' to 'autoplaySpeed'
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };
  
    return (
        <div className='container'>
            <div className='overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center'>
                <div className='container pb-8 sm:pb-0'>
                    <Slider {...settings}>
                        {
                            HeroSlide.map((data)=>(
                                <div key={data.id}>
                                    <div className='grid grid-cols-1 sm:grid-cols-2'>
                                        <div className='flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                            <h1 className='text-2xl sm:text-6xl lg:text-2xl font-bold'>{data.subtitle}</h1>
                                            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title1}</h1>
                                            <h1 className='text-5xl uppercase text-white dark:text-white/5 sm;text-[80px] md:text-[100px] xl:text-[150px] font-bold'>{data.title2}</h1>
                                            <div>
                                                <Button text="Buy Now" bgColor="bg-zinc-800" textColor="text-white"/>
                                            </div>
                                        </div>
                                        <div className='order-1 sm:order-2'>
                                            <div>
                                                <img src={data.img} className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-110 object-contain, max-auto relative z-40'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Hero;
