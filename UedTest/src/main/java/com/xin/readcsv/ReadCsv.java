package com.xin.readcsv;

import java.nio.charset.Charset;
import java.util.ArrayList;

import com.csvreader.CsvReader;
import com.xin.bean.dataDemo;

public class ReadCsv {
		public ArrayList<dataDemo> load(){
			ArrayList<dataDemo> dataList = new ArrayList<dataDemo>();
			try {
				String fileName = "D://航空器日志记录.csv";
				CsvReader reader = new CsvReader(fileName, ',', Charset.forName("GBK"));
				int i = 0;
				while (reader.readRecord()) {
					if(i != 0){
						dataDemo dataDemo = new dataDemo();
						String[] values = reader.getValues();
						String airport = values[6];//机场
						String rpName = values[7];//航路点名称
						if(airport != ""){
							dataDemo.setDate(values[1]);
							dataDemo.setX_name(values[6]);
							dataDemo.setHeight(values[5]);
							dataDemo.setSpeed(values[10]);
							dataList.add(dataDemo);
						}else if(rpName != ""){
							dataDemo.setDate(values[1]);
							dataDemo.setX_name(values[7]);
							dataDemo.setHeight(values[5]);
							dataDemo.setSpeed(values[10]);
							dataList.add(dataDemo);
						}
					}
				i++;
				}
				System.out.println(dataList.size());
				return dataList;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}
		
		public static void main(String[] args) {
			ReadCsv readCsv = new ReadCsv();
			ArrayList<dataDemo> dataList = readCsv.load();
			StringBuffer _x = new StringBuffer();
			StringBuffer _y1 = new StringBuffer();
			StringBuffer _y2 = new StringBuffer();
			_x.append("[");
			_y1.append("[");
			_y2.append("[");
			for(dataDemo d : dataList){
				_x.append("'"+d.getDate().substring(11, d.getDate().length()) + "-" +d.getX_name() + "',");
				_y1.append(d.getHeight()+",");
				_y2.append(d.getSpeed()+",");
			}
			String x = _x.substring(0, _x.length()-1)+"]";
			String y1 = _y1.substring(0, _y1.length()-1)+"]";
			String y2 = _y2.substring(0, _y2.length()-1)+"]";
			System.out.println(x);
			System.out.println(y1.toString());
			System.out.println(y2.toString());
		}
}
