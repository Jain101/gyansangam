import React from 'react'
import { FaHome, FaRegQuestionCircle } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import { Button } from '../index'
import { Link } from 'react-router-dom'

function LeftSideBar() {
    const options = [
        {
            name: "Home",
            slug: '/',
            icon: <FaHome />
        },
        {
            name: "Questions",
            slug: '/questions',
            icon: <FaRegQuestionCircle />
        },
        {
            name: "Tags",
            slug: "/tags",
            icon: <IoPricetags />
        },
        {
            name: "Saves",
            slug: "/saves",
            icon: <IoMdSave />
        }
    ]
    return (
        <div className='fixed top-24 left-8'>
            <ul className='flex flex-col gap-5'>
                {options.map((option) => (
                    <Link to={option.slug} key={option.name} className="flex items-center
                    cursor-pointer transition-all hover:bg-gray-300 px-3 py-1 rounded-full gap-3 text-xl">
                        <span>{option.icon}</span>
                        <span>{option.name}</span>
                    </Link>
                ))}
            </ul>
            <Link to={'/ask-question'}>
                <Button
                    type="submit"
                    className="w-full text-white mt-5 text-lg shadow-md hover:bg-blue-800">
                    Ask Question
                </Button>
            </Link>
        </div>
    )
}

export default LeftSideBar