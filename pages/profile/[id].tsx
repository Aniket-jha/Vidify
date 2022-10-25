import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { GoVerified } from 'react-icons/go'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser,Video } from '../../type'
import { BASE_URL } from '../../utils'

interface IProps{
  data:{
    user:IUser,
    userPosts:Video[],
    userLikes:Video[]
  }
}

const Profile = ({data}:IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videoList, setVideoList] = useState<Video[]>([])
 
  const {user,userPosts,userLikes} = data
   console.log(user)
  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
   const likes = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
    console.log(userPosts)
     console.log(userLikes)
    useEffect(()=>{
      if(showUserVideos){
          setVideoList(userPosts)
      }
      else{
        setVideoList(userLikes)
      }
    },[showUserVideos,userLikes,userPosts])

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
         <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded '>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                 <Image src={user.image} width={120} height={120} layout='responsive' className='rounded-full'  />
                </div>
                <div className='flex flex-col items-center justify-center' >
                <p className='flex items-center justify-center tracking-wider md:text-2xl gap-1 text-md font-bold text-primary lowercase'>{user.userName.replaceAll(' ','')} <GoVerified className='text-blue-400' /></p>
                 <p className='flex md:text-xl gap-1 text-md font-bold  capitalize text-gray-400'>{user.userName} <GoVerified className='text-blue-400' /></p>
                </div>
              </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-100 bg-white w-full'>
          <p className={`text-xl font-semibold ${videos} cursor-pointer mt-2`} onClick={()=>setShowUserVideos(true)}>Videos</p>
          <p className={`text-xl font-semibold ${likes} cursor-pointer mt-2`} onClick={()=>setShowUserVideos(false)}>Liked</p>
        </div>

        <div className='flex gap-6 flex-wrap md:justify-start'>
          {
            videoList ? (
              videoList.map((post:Video,id:number)=>(
                  <VideoCard post={post} key={id} />
              ))
            ):(
              <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos `} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params:{id}}:{params:{id:string}})=>{
const res = await axios.get(`${BASE_URL}/api/profile/${id}`)
return{
  props:{data:res.data}
}
}

export default Profile