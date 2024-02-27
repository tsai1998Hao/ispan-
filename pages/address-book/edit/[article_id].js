import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { AB_GET_ONE,AB_EDIT_ONE } from "@/components(/my-const";
import Layout1 from "@/components(/Layout1";

export default function ABEdit() {
  const [myForm, setMyform] = useState({
    article_id:"",
    article_boardcategory_name:"",
    article_title_name:"",
    article_content:"",
});

    const router =useRouter();
    useEffect(()=>{
      const article_id = +router.query.article_id;
      console.log({article_id});
      if(router.query.article_id !== undefined){
        if(!article_id){
          router.push("/address-book");
        }else{
          //取得單筆資料
          fetch(AB_GET_ONE+"/" +article_id)
          .then(r=>r.json())
          .then(data=>{
            if(! data.success){
              router.push("/address-book");

            } else{
              setMyform({...data.row})
            }
          })
        }

      }

    },[router.query.article_id]);












    const [displayInfo,setdisplayInfo] = useState("");
    const changeHandler = (e)=>{
        const {name, id, value}=e.target;
        console.log({name, id, value});
        setdisplayInfo("")
        setMyform({...myForm, [id]: value});
        // setMyform((old)=>{
        //     return {old, name: e.target.value};
        // });
    
    
    };

    const onSubmit = async (e)=>{
        e.preventDefault();
      const mySend ={...myForm};
    
      const r = await fetch(AB_EDIT_ONE + "/" + myForm.article_id, {
        method:'PUT',
        body: JSON.stringify(myForm),
        headers:{
          "Content-Type": "application/json",
        },
      })
      const resposeData = await r.json();
      if(resposeData.success){
        setdisplayInfo("succ");
        // alert("新增成功")
      }else {
        setdisplayInfo("fail");
        // alert("新增失敗...")
      }
    };























    return (
      <>
        <Layout1>
  
        <div className="row">
      <div className="col-6">
  
  
        <div className="card">
  
          <div className="card-body">
            <h5 className="card-article_title_name">新增資料</h5>
  
  
            <form name="form1" onSubmit={onSubmit}>
  {/* 
              <!-- <div className="mb-3">
                <label htmlFor="article_id" className="form-label">article_id</label>
                <input type="text" className="form-control" id="article_id" name="article_id"/>
                <div className="form-text"></div>
              </div> 
  
  
               <div className="mb-3">
                <label htmlFor="article_member_id" className="form-label">article_member_id</label>
                <input type="text" className="form-control" id="article_member_id" name="article_member_id"/>
                <div className="form-text"></div>
              </div> --> */}
  
              <div className="mb-3">
                <label htmlFor="article_boardcategory_name" className="form-label">article_boardcategory_name</label>
                <input type="text" className="form-control" id="article_boardcategory_name" name="article_boardcategory_name" value={myForm.article_boardcategory_name} onChange={changeHandler}/>
                <div className="form-text"></div>
              </div>
  
              <div className="mb-3">
                <label htmlFor="article_title_name" className="form-label">article_title_name</label>
                <input type="text" className="form-control" id="article_title_name" name="article_title_name" value={myForm.article_title_name} onChange={changeHandler}/>
                <div className="form-text"></div>
              </div>
  
              <div className="mb-3">
                <label htmlFor="article_content" className="form-label">article_content</label>
                <textarea id="article_content" className="form-control" name="article_content" cols="30" rows="7" value={myForm.article_content} onChange={changeHandler}></textarea>
              </div>
  
  {displayInfo ? (
    displayInfo=== "succ" ? <div class="alert alert-success" role="alert">
  修改成功</div> : <div class="alert alert-danger" role="alert">
  修改失敗</div>
  ): null
  
  
  }
  
              {/* <div class="alert alert-success" role="alert">新增成功</div>
  
              <div class="alert alert-danger" role="alert">新增失敗</div> */}
  
  
  
  
  
  
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
  
  
          </div>
        </div>
  
      </div>
  </div>
  
  
  
  
        </Layout1>
  
      </>    
      
      )
  }
