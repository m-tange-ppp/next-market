import { useState } from "react";
import { ImgInputPropsDataType } from "../pages/api/utils/types";

function ImgInput(props: ImgInputPropsDataType) {
    const [imageFile, setImageFile] = useState<File|null>(null);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

    async function handleClick() {
        if (!imageFile) {
            alert("画像を選択してください");
            return;
        }
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
            <input type="file" onChange={(e) => setImageFile(e.target.files? e.target.files[0]:null)} accept="image/jpeg image/png" />
            <button onClick={handleClick} disabled={!imageFile} >画像 Upload</button>
        </div>
    )
}

export default ImgInput;