package com.xin.test;

import java.io.File;  
import java.io.FileOutputStream;  
import java.io.InputStream;  
import java.net.URL;  
import java.net.URLConnection;  
import java.util.ArrayList;  
import java.util.List;  
import java.util.regex.Matcher;  
import java.util.regex.Pattern;  
  
/*** 
 * java抓取网络图片 
 * @author swinglife 
 * 
 */  
public class CatchImage {  
  
    // 地址  
//    private static final String URL = "http://www.csdn.net";  
    private static final String URL = "https://www.zhihu.com/question/37787176";  
//    private static final String URL = "http://web.breadtrip.com/";  
    // 编码  
    private static final String ECODING = "UTF-8";  
    // 获取img标签正则  
    //https://pic4.zhimg.com/1a571fc177be7df4e39cbf3d4f8581c7_b.png
    private static final String IMGURL_REG = "h3 data-num=\"(.*?)\"";  
    // 获取src路径的正则  
//    private static final String IMGSRC_REG = "http:\"?(.*?)(\"|>|\\s+)";
    private static final String IMGSRC_REG = "img .*?src=\"(.*?_b.*?)\"";  
  
      
    public static void main(String[] args) throws Exception {  
        CatchImage cm = new CatchImage();  
        //获得html文本内容  
        String HTML = cm.getHTML(URL);
//        System.out.println(HTML);
        //获取图片标签  
        List<String> imgUrl = cm.getImageUrl(HTML);  
        //获取图片src地址  
        List<String> imgSrc = cm.getImageSrc(imgUrl);  
        //下载图片  
        cm.Download(imgSrc);  
    }  
      
      
    /*** 
     * 获取HTML内容 
     *  
     * @param url 
     * @return 
     * @throws Exception 
     */  
    private String getHTML(String url) throws Exception {  
        URL uri = new URL(url);  
        URLConnection connection = uri.openConnection();  
        InputStream in = connection.getInputStream();  
        byte[] buf = new byte[1024];  
        int length = 0;  
        StringBuffer sb = new StringBuffer();  
        while ((length = in.read(buf, 0, buf.length)) > 0) {  
            sb.append(new String(buf, "GBK"));  
        }  
        in.close();  
        return sb.toString();  
    }  
  
    /*** 
     * 获取ImageUrl地址 
     *  
     * @param HTML 
     * @return 
     */  
    private List<String> getImageUrl(String HTML) {  
        Matcher matcher = Pattern.compile(IMGURL_REG).matcher(HTML);  
        List<String> listImgUrl = new ArrayList<String>();  
        while (matcher.find()) {  
            listImgUrl.add(matcher.group());  
        }
        return listImgUrl;  
    }  
  
    /*** 
     * 获取ImageSrc地址 
     *  
     * @param listImageUrl 
     * @return 
     */  
    private List<String> getImageSrc(List<String> listImageUrl) {  
        List<String> listImgSrc = new ArrayList<String>();  
        for (String image : listImageUrl) {  
        								  //img .*?src="(.*?_b.*?)"
        	Pattern p = Pattern.compile(IMGSRC_REG, Pattern.CASE_INSENSITIVE);
        	Matcher matcher = p.matcher(image);  
            while (matcher.find()) {
                listImgSrc.add(matcher.group().substring(0, matcher.group().length() - 1));  
            }  
        }  
        return listImgSrc;  
    }  
  
    /*** 
     * 下载图片 
     *  
     * @param listImgSrc 
     */  
    private void Download(List<String> listImgSrc) {  
        try {  
        	System.out.println(listImgSrc.size());
        	int i = 0;
            for (String url : listImgSrc) { 
            	if( i != 43){
	            	System.out.println("开始下载:"+ i + "    --------          " + url); 
	                String imageName = url.substring(url.lastIndexOf("/") + i, url.length());  
	                URL uri = new URL(url);  
	                InputStream in = uri.openStream();  
	                FileOutputStream fo = new FileOutputStream(new File(imageName));  
	                byte[] buf = new byte[1024];  
	                int length = 0;  
	                while ((length = in.read(buf, 0, buf.length)) != -1) {  
	                    fo.write(buf, 0, length);  
	                }  
	                i++;
	                in.close();  
	                fo.close();  
	                System.out.println(imageName + "下载完成");  
            	} 
            	i++;
            }
        } catch (Exception e) {  
            System.out.println("下载失败");  
        }  
    }  
  
      
}  
