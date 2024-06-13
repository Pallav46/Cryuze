import Banner from '../../../components/user/banner/Banner';
import Footer from '../../../components/user/footer/Footer';
import Navbar from '../../../components/user/navbar/Navbar';
import Products from '../../../components/user/products/Products';

const BannerData = {
    discount: "20% OFF",
    title: "Lorem, ipsum dolor",
    image: "",
    title2: "Lorem ipsum dolor sit",
    title3: "lorem ipsum dolor",
    title4: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio at quia id",
    bgColor: "#f42c37"
};

function Subcategories() {
    return (
        <div>
            <Navbar />
            <div className='mt-[2rem]'>
                <Banner data={BannerData} />
            </div>
            <div className="mt-16 p-4 my-14 md:my-20">
                <Products />
            </div>
            <Footer/>
        </div>
    );
}

export default Subcategories;
