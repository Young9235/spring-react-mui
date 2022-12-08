package com.example.Server.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.UUID;

import com.example.Server.dto.AttachDto;
import com.example.Server.model.Attach;

public class FileUtil
{
	// 원격 파일 다운로드 URL
	public static void uploadFileDown(String fileUrl, String saveFileNm, String uploadPath) {
	
		Path target = Paths.get(uploadPath, saveFileNm); // 파일 저장 경로

		try {
			URL url = new URL(fileUrl);
			InputStream in = url.openStream();
			Files.copy(in, target); // 저장
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static ArrayList<Attach> fileUpload(ArrayList<AttachDto> fileData, 
			String fileuploadPath, String subUploadPath) throws Exception {

		String uploadPath = fileuploadPath + File.separatorChar + subUploadPath;
		System.out.println("uploadPath ==> "+uploadPath);
		File saveFolder = new File(uploadPath);
		
		ArrayList<Attach> result = new ArrayList<>();

		if ((!saveFolder.exists()) || (saveFolder.isFile())) {
			saveFolder.mkdirs();
		}
		
		for(AttachDto file : fileData) {
			String fileUrl = file.getPreviewUrl();
			String fileName = file.getName();
			
			int index = fileName.lastIndexOf(".");
			String ext = fileName.substring(index); // 파일 확장자 추출
			String uuid = UUID.randomUUID().toString(); // 파일명 (랜덤생성)
			String saveFileNm = uuid + ext;
			
			FileUtil.uploadFileDown(fileUrl, saveFileNm, uploadPath);
		}
		
		return result;
		
		//max file size check
//		Iterator itr = files.entrySet().iterator();
//
//		while (itr.hasNext()) {
//			Map.Entry entry = (Map.Entry)itr.next();
//			MultipartFile file = (MultipartFile)entry.getValue();
//			System.out.println("File Size ===>>>  "+file.getSize());
//			if(MAX_FILE_SIZE < file.getSize()) {
//				throw new Exception("============ DownLoad File Size Over MaxSize =====================");
//			}
//		}
//		
//		Iterator fitr = files.entrySet().iterator();
//		Map fileInfo = new HashMap();
//		while (fitr.hasNext()) {
//			Map.Entry entry = (Map.Entry)fitr.next();
//			MultipartFile file = (MultipartFile)entry.getValue();
//			fileName = file.getOriginalFilename();
//			
//			if (!"".equals(fileName)) {
//				fileInfo = new HashMap();
//				String nFileName = UUID.randomUUID().toString();
//
//				String ext = fileName.substring(fileName.lastIndexOf("."));
//
//				fileInfo.put("orgFileNm", fileName);
//				fileInfo.put("saveFilePath", uploadPath);
//				fileInfo.put("saveFileNm", nFileName + ext);
//				fileInfo.put("fileSize", String.valueOf(file.getSize()));
//
//				String filePath = uploadPath + File.separatorChar + nFileName + ext;
//				file.transferTo(new File(filePath));
//				
//				result.add(fileInfo);				
//			}
//		}
//
//		return result;
	}
	
}
