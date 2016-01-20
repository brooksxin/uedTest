package com.xin.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import org.junit.Test;

/*
 * 使用NIO来读写文件
 */
public class ReadWriteFile {
	
	
	/*
	 * FileReader继承了InputStreamReader，但并没有实现父类中带字符集参数的构造函数，所以FileReader只能按系统默认的字符集来解码，
	 * 然后在UTF-8 -> GBK -> UTF-8的过程中编码出现损失，造成结果不能还原最初的字符。 
	         原因明确了，这个问题解决起来并不困难，用InputStreamReader代替FileReader
	 */
	public void readFile() throws Exception {
		String filepath = "D://1.txt";
		BufferedReader br = new BufferedReader(new FileReader(filepath));
		String str = null;
		StringBuffer buf = new StringBuffer();
		while ((str = br.readLine()) != null) {
			buf.append(str);
			buf.append("\r\n");
		}
		System.out.println(buf.toString());

		br.close();
	}
	
	
	public void readFile2() throws Exception{
		String filePath = "D://1.txt";
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "gb2312"));
		String str = null;
		StringBuffer buf = new StringBuffer();
		while((str = br.readLine()) != null){
//			System.out.println(br.readLine());
			buf.append(str);
		}
		System.out.println(buf.toString());
		br.close();
	}
	
	
	public void writeFile() throws Exception{
		String filePath ="D://2.txt";
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filePath), "gb2312"));
		bw.write("我是小baibai，请多指教！");
		bw.flush();
		bw.close();
	}
	
	/*
	 * 以上是普通的javaIO流，下面用nio来进行对比
	 * 现在我们要用 NIO 来读写文件，肯定是要用到 Channel 和 Buffer 了。
	 * 一句话描述过程就是从 FileInputStream 得到的 FileChannel 中读取数据到 Buffer 中，再处理 Buffer 中的数据。
	 */
	
	@Test
	public void readFileByNio() throws Exception{
		String filePath = "D://1.txt";
		FileInputStream fs = new FileInputStream(filePath);
		
		FileChannel fc = fs.getChannel();
		
//		ByteBuffer bytef = ByteBuffer.allocate(1204);
		ByteBuffer bytef = ByteBuffer.allocate((int)fc.size()+1);
		
		fc.read(bytef);
		
		bytef.rewind();
		
		while(bytef.hasRemaining()){
			System.out.println(bytef.getChar());
		}
	}
	
}
