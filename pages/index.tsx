import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import {Video} from '../type'
import VideoCard from "../components/VideoCard"
import NoResult from "../components/NoResults"
import {BASE_URL} from "../utils/index"
interface IProps{
  videos:Video[]
}

const Home= ({videos}:IProps) => {
  console.log(videos)
  return (
        <div>
       <div className='flex flex-col gap-10 videos h-full'>
        {
          videos.length ? (
            videos.map((video:Video)=>(
              <VideoCard post={video} key={video._id}/>
            ))
          ):
          <NoResult text={'No Videos'} />
        }
       </div>
    </div>
   
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};

export default Home
