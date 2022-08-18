package com.example.Server.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SeqMapper {
	String getSequenceInfo(String params) throws Exception;
	int updateSequenceInfo(String params) throws Exception;
	Map<String, Object> getYearWeekNumOfDay(Map<String, Object> map) throws Exception;
	int getSysDateWeekNum() throws Exception;
}
