package com.example.Server.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@MapperScan(value = {"com.example.Server.dao"})
@EnableTransactionManagement
public class DatabaseCMSConfig {
	
    @Bean(name="cmsDataSource")
    @ConfigurationProperties(prefix = "spring.cms.datasource")
    public DataSource cmsDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean(name = "cmsSqlSessionFactory")
    public SqlSessionFactory cmsSqlSessionFactory(
            @Qualifier("cmsDataSource") DataSource cmsDataSource, 
            ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(cmsDataSource);
        sqlSessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:mybatis/mybatis-config.xml"));
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mybatis/cmsMapper/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }
 
    @Bean(name = "cmsSqlSessionTemplate")
    public SqlSessionTemplate cmsSqlSessionTemplate(SqlSessionFactory cmsSqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(cmsSqlSessionFactory);
    }
	
}
