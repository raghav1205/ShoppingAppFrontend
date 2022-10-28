import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
const New = () => {
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    // const []
    const {user} = useSelector(state => state.user)
    const handleAdd = async (e) => {
        e.preventDefault()
        console.log('hi')
        
        const REACT_APP_API_URL  = `https://peaceful-beyond-47525.herokuapp.com/products/${user.id}/new`
        const response = await fetch(REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
                description,
                img: image
            }),
        })
        const res = await response.json()
        console.log(res)
    }
    return <form  
                    className = 'flex flex-col border-2 border-slate-200 w-[17rem]  md:w-[40rem] items-center justify-center mx-auto mt-[3rem] p-[3rem] gap-[1rem] rounded-lg'
            >
                <>
                <label forHtml = 'name'>
                    <span className = 'flex justify-start w-[20rem] md:w-[40rem] text-lg pl-[3rem]'>
                        Name
                    </span>
                </label>
                <input  name = 'name' type = 'text' className='border-2 py-1.5 rounded-md w-full'
                 value = {name} onChange = {(e) => setName(e.target.value) }/>
                

                <label forHtml = 'price'>
                    <span className = 'flex justify-start w-[20rem] md:w-[40rem] text-lg pl-[3rem]'>
                        Price
                    </span>
                </label>
                <input type = 'text' className='border-2 py-1.5 rounded-md w-full'
                 value = {price} onChange = {(e) => setPrice(e.target.value)}
                />
                <label forHtml = 'imageUrl'>
                    <span className = 'flex justify-start w-[20rem] md:w-[40rem] text-lg pl-[3rem]'>
                        Image Url
                    </span>
                </label>
                

                <input type = 'text' className='border-2 py-1.5 rounded-md w-full'
                value = {image} onChange = {(e) => setImage(e.target.value)}/>
                <label forHtml = 'description'>
                    <span className = 'flex justify-start w-[20rem] md:w-[40rem] text-lg pl-[3rem]'>
                        Description
                    </span>
                </label>
                <textarea type = 'text' className='border-2 py-1.5 rounded-md w-full'
                value = {description} onChange = {(e) => setDescription(e.target.value)}
                />  
                

                <div className = 'flex justify-start w-full'>
                    <button 
                    onClick = {handleAdd}
                    class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Add
                    </button>
                </div>
                </>
        </form>
    
}
export default New