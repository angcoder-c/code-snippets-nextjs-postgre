export default function SearchFilter ({
    label
}:{
    label : string
}) {
    return (
        <div>
            <input type="text" placeholder={label} />
        </div>
    )
}