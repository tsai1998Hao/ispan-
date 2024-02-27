import Layout1 from "@/components(/Layout1"
import { useEffect, useState } from "react"
import { AB_LIST, AB_DEL_ONE } from "@/components(/my-const"
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/router";
export default function ABIndex() {
    const [data, setData ]=useState({});
    const router= useRouter();


    const getListData = async ()=>{
      console.log(router.query, 555)
        let page= +router.query.page || 1;
        if(page<1) page=1;
      try{
        const r =await fetch(AB_LIST +`?page=${page}`);
        const d = await r.json();
        setData(d);
    }catch(ex){}    
};
    useEffect(()=>{
        getListData();
    },[router.query.page]);

    const removeItemAndReload = async (article_id)=>{
      console.log({article_id});

      const r = await fetch(AB_DEL_ONE +"/" +article_id, {
        method: "DELETE",
      });
      const result =await r.json();

      if(result.success){
        //router.reload();
        getListData();
      }


    };




  return (
    <>
        <Layout1>
    <div className="row">
      <pre className="col">{router.query.page}</pre>
    </div>


        <div className="row">
          <div className="col">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                { data.success && data.totalPages 
                ? Array(20)
                .fill(1)
                .map((v, i)=>{
                  const p =data.page-5 +i;
                  if(p<1 || p > data.totalPages) return null;
                  return(
                    <li key={p} className={ p===data.page ? "page-item active" :"page-item" }>
                      <Link  className="page-link" href={"?page="+p}>{p}</Link>
                    </li>
                  );


                  /* 第二種註解方式
                  if(p>=1 && p<= data.totalPages){
                    return(
                    <li key={i} className="page-item">
                      <Link  className="page-link" href="?">{i+1}</Link>
                    </li>
                  );
                  }else{
                    return null;
                  }
                  */
          })
         :null }

        {/*} 第一種註解方式
          <% for(let i=page-5; i<=page+5; i++) if(i>=1 && i<=totalPages) { %>
          <li className="page-item <%= i===page ? 'active' : '' %>">
            <a
              className="page-link"
              href="?<%= new URLSearchParams({...qs, page: i}).toString() %>"
              ><%= i %></a
            >
          </li>
          <% } %>
        */}
        </ul>
      </nav>



          </div>
        </div>

        <div className="row">
    <div className="col">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th><i className="fa-solid fa-trash"></i></th>
            <th>編號</th>
            <th>姓名</th>
            <th>email</th>
            <th>手機</th>
            <th>生日</th>
            <th>地址</th>
            <th><i className="fa-solid fa-square-pen"></i></th>
          </tr>
        </thead>
        <tbody>
            {  data.rows && data.rows.map((i)=>{
                return(
                <tr key={i.article_id}>
            <td>
              <div style={{cursor:"pointer", display:"inline-block", color:"red"}} onClick={()=>removeItemAndReload(i.article_id)}>
                <i className="fa-solid fa-trash"></i>
              </div>
            </td>
            <td>{ i.article_id }</td>
            <td>{ i.article_member_id }</td>
            <td>{ i.article_member_name }</td>
            <td>{ i.article_boardcategory_name }</td>
            <td>{ i.article_title_name }</td>
            <td>{ i.article_content }</td>
            <td>{dayjs (i.article_release_date).format('YYYY-MM-DD-HH-MM') }</td>
            <td>{ i.article_update_date }</td>
            <td>{ i.article_like_num }</td>
            <td>{ i.article_comment_num }</td>
            <td>{ i.pic }</td>

            <td>
              <Link href={`/address-book/edit/${i.article_id}`}>
                <i className="fa-solid fa-square-pen"></i>
              </Link>
            </td>
          </tr>
                );

            }) }
        </tbody>
      </table>
    </div>

  </div>

    
    
            </Layout1>
    </>
  )
}
