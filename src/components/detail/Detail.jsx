import {useParams} from "react-router-dom"
import { useDispatch } from "react-redux/";
import { likePost, updatePost } from "../../redux/modules/posts";
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

import Postmodal from "../postmodal/Postmodal";

const Detail = () =>{
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [modal, setModal] = useState(false);
    let {id} = useParams();
    let [post, setPost] = useState({});
    const fetchPosts = async () => {
        const { data } = await axios.get("http://localhost:3001/posts");
        setPost( data.find((post)=>{
          return String(post.id) === id;
      }))// 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
      };
    useEffect(()=>{
            setTimeout(()=>{fetchPosts();},500);
    },[])

    const removePost = (id) => {
      axios.delete(`http://localhost:3001/posts/${id}`);
    }

    const close=()=>{
      setModal(false);
    }

    return (
      <>{modal? <Postmodal post={post} close={close}/>:null}
      <div className='modal' style={{background: 'skyblue'}}>
        <button onClick={()=>navigate(-1)} >이전으로</button>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <p>{post.date}</p>
          <p>{post.writer}</p>
          <div>
            <p>{post.count}</p>
            <button onClick={()=>{
                dispatch(likePost(post.id))
            }}>👍좋아요</button>
          <button onClick={()=>{
            setModal(true);
          }}>수정하기</button>
          <button onClick={()=>{
            removePost(post.id);
            navigate("/list")
          }}>삭제하기</button>
          </div>
        </div>
      </>
    )
  }

  export default Detail;