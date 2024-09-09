import { useState } from "react";

function ImgInput(props) {
    const [imageFile, setImageFile] = useState("");
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    async function handleClick() {
        try {
            const data = new FormData();
            data.append("file", imageFile);
            data.append("upload_preset", "next-market");
            data.append("cloud_name", cloudName);
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: data });
            const jsonData = await response.json();
            await props.setImage(jsonData.url);
            alert("画像アップロード成功");
        } catch (error) {
            alert("画像アップロード失敗");
        }
    }

    return (
        <div className="img-input">
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/jpg image/png" />
            <button onClick={handleClick} disabled={!imageFile} >画像 Upload</button>
        </div>
    )
}

export default ImgInput;