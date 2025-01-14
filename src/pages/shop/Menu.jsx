import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import { FaFilter } from 'react-icons/fa';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    // loading Data
    useEffect(() => {
        //fetch data from backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/menu');
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (err) {
                console.log("Error fetching Data", err);
            }
        };
        fetchData();
    }, []);

    //filtering data based on category
    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    //show all data
    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
        setCurrentPage(1);
    };

    //sorting based on A-Z, Z-A ,Low-high pricing
    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];

        //logic
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredItems(sortedItems);
        setCurrentPage(1);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* menu banner */}
            <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className="py-48 flex flex-col justify-center items-center gap-8">
                    {/* texts  */}
                    <div className="text-center space-y-7 px-4">
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>For the Love of Delicious <span className='text-green'>Food</span></h2>
                        <p className='text-xl md:w-4/5 mx-auto text-[#4A4A4A]'>Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost.</p>
                        <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>Order Now</button>
                    </div>
                </div>
            </div>

            {/* menu shop section */}
            <div className='section-container'>
                {/* Filtering and sorting */}
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                    {/*all category btns */}
                    <div className="flex flex-col sm:flex-row justify-start items-start gap-2 md:gap-8 flex-wrap mt-4">
                        <button onClick={showAll} className={`px-4 py-2 ${selectedCategory === "all" ? "active" : ""}`}>All</button>
                        <button onClick={() => filterItems('salad')} className={`px-4 py-2 ${selectedCategory === "salad" ? "active" : ""}`}>Salad</button>
                        <button onClick={() => filterItems('pizza')} className={`px-4 py-2 ${selectedCategory === "pizza" ? "active" : ""}`}>Pizza</button>
                        <button onClick={() => filterItems('soup')} className={`px-4 py-2 ${selectedCategory === "soup" ? "active" : ""}`}>Soups</button>
                        <button onClick={() => filterItems('dessert')} className={`px-4 py-2 ${selectedCategory === "dessert" ? "active" : ""}`}>Desserts</button>
                        <button onClick={() => filterItems('drinks')} className={`px-4 py-2 ${selectedCategory === "drinks" ? "active" : ""}`}>Drinks</button>
                    </div>
                    <div className='flex justify-end mb-4 rounded-md border-spacing-1'>
                        <div className='bg-green p-2 rounded-full mr-1'>
                            <FaFilter className='h-4 w-4 text-white' />
                        </div>
                        {/* Sorting options */}
                        <select name="sort" id="sort"
                            onChange={(e) => handleSortChange(e.target.value)}
                            value={sortOption}
                            className="bg-white text-green px-2 py-1 rounded-md">
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Price: Low to high</option>
                            <option value="high-to-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                {/* Product Cards */}
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-4'>
                    {
                        currentItems.map((item) => (
                            <Cards key={item._id} item={item} />
                        ))
                    }
                </div>
            </div>

            {/* Pagination Section */}
            <div className='flex justify-center my-8'>
                {
                    Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default Menu;
