

export const EventListView=({data})=>{
    //행사일정 나타네는 컴포넌트

    return(
    
        <div className="service-img"><div className="container contcss">
            <img src={data.firstimage}  className="d-block w-100" style={{ height: '450px' }}/>
            
            <p className="tour-content2">{data.title}</p>
            <p className="tour-content">{data.eventstartdate}~ {data.eventenddate}</p></div>
        </div>

    )
}