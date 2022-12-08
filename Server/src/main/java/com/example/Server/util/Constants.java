package com.example.Server.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class Constants
{
	public static final int LOGIN_SUCCESS				= 0;
	public static final int LOGIN_FAIL_ACCOUNT			= 1;	// 잘못된 계정 정보	
	public static final int LOGIN_PASSWD_ERROR			= 2;	// 패스워드 오류	
	public static final int PERMISSION_GRANT_ERROR		= 3;	// 권한 설정 에러, 권한 및 메뉴에 대한 설정 오류
	public static final int LOGIN_FAIL_ALREADY			= -99;	// 이미 로그인 되어 있는 계정
	
	
	
	
	public static final int PAGING_COUNT				= 10;	// 페이징 시 보여지는 숫자
	public static final int PAGING_COUNT_STAT			= 100;	// 페이징 시 보여지는 숫자 통계페이지용
	public static final int RECORD_COUNT				= 10;	// 한 페이지에서 보여지는 레코드 수
	public static final int BOARD_RECORD_COUNT			= 5;	
	public static final int RECORD_COUNT_STAT			= 100;	// 한 페이지에서 보여지는 레코드 수 통계페이지용
	public static final int EXCEL_COUNT_STAT			= 10000;	// 엑셀다운 맥스 로우
	
	//File Down Load Path
	public static final String DOWN_LOAD_PATH			= "C:\\ADVTS\\Attach";			// 로컬 업로드 패스
	
	public static final String CONTEXT_ATTATCH_PATH		= "/attach";
	
	//board sub folder
	public static final String BOOK_SUB_FOLDER			= "Book";	// 한 페이지에서 보여지는 레코드 수
	
	/**
	 * <Context path="/attach" reloadable="true" docBase="C:\ADVTS\Attatch\"></Context>
	 */
	private static final byte[] binaryBuffer = new byte[32 * 1024];
	
	//Excel Helper에서 사용하는 에러 코드
	public static final int EXCEL_HELPER_SUCCESS		= 0;	// 데이타 파싱 성공
	public static final int EXCEL_HELPER_ROWCNT_ERROR	= -1;	// 데이타 ROW 수량 파라메터 에러
	public static final int EXCEL_HELPER_PROC_ERROR	= -99;	// 데이타 ROW 수량 파라메터 에러
	
//	CDN FTP 설정(LGU+ 클라우드 서버)
	public static final String CDN_FTP_SERVER_IP	= "upload.cdn.cloudn.co.kr";		// CDN 서버 주소
	public static final int CDN_FTP_SERVER_PORT		= 21;								// CDN 서버 포트
	public static final String CDN_FTP_USER_ID		= "btbpump_TAVA";					// CDN 사용자 접속 계정
	public static final String CDN_FTP_USER_PASSWD	= "to21$comms";						// CDN 사용자 패스워드
	
	public static final String CDN_DOWNLOAD_URL = "http://TAVA.dl.cdn.cloudn.co.kr";

	
	//FTP 편성표 폴더 실제 파일위치 정보
	public static final String SERVER_WEEKPAIRING_PATH = "nas/weekpairing";
	
	//다운로드 웹URL 생성정보
	public static final String DOWNLOAD_WEEKPAIRING_PATH = "weekpairing";
	
	//batch scheduler id
	public static final int ErrLogSchedlId = 1;							//		errLogJob
	public static final int chgEndStsWkPrSchedlId = 2;					//		chgEndStsWeekPairJob
	public static final int chgCmpStsWkPrSchedlId = 3;					//		chgCompleteStsWeekPairJob
	public static final int chgRunDistrbStsWkPrSchedlId = 4;			//		chgRunDistrbStsWeekPairJob
	public static final int chgRunningStsWkPrSchedlId = 5;				//		chgRunningStsWeekPairJob
	public static final int procBatchPlayLogId = 6;						//		procBatchLogDataJob	
	public static final int procBatchBoardingLogId = 7;					//		procBatchLogDataJob
	public static final int procHourlyWPSCViewCntStatJob = 8;			//		procHourlyWPSCViewCntStatJob
	public static final int procLogSendingEquipJob = 9;					//		procLogSendingEquipJob
	public static final int procRealTimeWPTcntJob = 10;					//		procRealTimeWPTcntJob
	public static final int checkRnngWkPrSchdle = 11;					//		checkRnngWkPrSchdle
	
	
	//로그 배치를 돌릴때 작업해야할 수량
	public static final int procCntBatchPlay = 3000;							//		procBatchLogDataJob	
	
	//배치를 위한 변수 
	//확정상태
	public static final String completeStsJobDate = "+1";
	//운영배포
	public static final String runDistrbStsJobDate = "+1";
	
	public static final String SERVER_FILE_TRNSFER_MODE = "CDN";		// CDN, LOCAL
	
	/**
	 * 서버가 설치된 운영체제의 종류를 조회한다. 
	 * @return
	 */
	public static String getOsVersion() {
		String osName = System.getProperty("os.name");
		if(osName == null) {
			return "";
		}if (osName.toLowerCase().indexOf("win") >= 0) { // window
			return "win";
		} else if (osName.toLowerCase().indexOf("nux") >= 0
				|| osName.toLowerCase().indexOf("nix") > 0) { // linux or unix
			return "nix";
		} else if (osName.toLowerCase().indexOf("sunos") > 0) { // solaris
			return "sun";
		} else {
			return "";
		}
	}
	
	
	
	/**
	 * 파일스트림을 복사한다.
	 * @param in
	 * @param out
	 * @throws IOException
	 */
	public static void copyStreamFast(InputStream in, OutputStream out)
			throws IOException {
		int nRead;
		for (;;) {
			synchronized (binaryBuffer) {
				nRead = in.read(binaryBuffer);
				if (nRead < 0)
					break;
				out.write(binaryBuffer, 0, nRead);
			}
		}
	}

	/**
	 * 파일을 이동한다.
	 * @param f
	 * @param newPath
	 * @throws IOException
	 */
	public static void moveFile(File f, File newPath) throws IOException {

		// 일단 이동 명령으로 이동
		if (f.renameTo(newPath))
			return;

		// 위 명령으로 안된 경우 "파일 복사 후 삭제"로 이동
		InputStream in = null;
		OutputStream out = null;

		try {
			in = new FileInputStream(f);
			out = new FileOutputStream(newPath);

			copyStreamFast(in, out);

		} catch (IOException e) {
			throw new IOException(f + " 파일을 " + newPath
					+ "(으)로 이동하는 중 오류가 발생했습니다. 원인: " + e.getMessage());

		} finally {
			if (in != null)
				in.close();
			if (out != null)
				out.close();

			if (in != null && out != null)
				f.delete();
		}
	}

	/**
	 * 파일을 복사한다.
	 * @param f
	 * @param newPath
	 * @throws IOException
	 */
	public static void copyFile(File f, File newPath) throws IOException {

		// 위 명령으로 안된 경우 "파일 복사 후 삭제"로 이동
		InputStream in = null;
		OutputStream out = null;

		try {
			in = new FileInputStream(f);
			out = new FileOutputStream(newPath);

			copyStreamFast(in, out);

		} catch (IOException e) {
			throw new IOException(f + " 파일을 " + newPath
					+ "(으)로 복사하는 중 오류가 발생했습니다. 원인: " + e.getMessage());
		} finally {
			if (in != null)
				in.close();
			if (out != null)
				out.close();
		}
	}

	
	
}
