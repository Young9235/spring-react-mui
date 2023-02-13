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
import org.springframework.context.annotation.Primary;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@MapperScan(value = {"com.example.Server.dao"})
@EnableTransactionManagement
public class DatabaseOriConfig {
	
    @Bean(name="oriDataSource")
    @Primary
    @ConfigurationProperties(prefix = "spring.ori.datasource")
    public DataSource oriDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean(name = "oriSqlSessionFactory")
    @Primary
    public SqlSessionFactory oriSqlSessionFactory(
            @Qualifier("oriDataSource") DataSource oriDataSource, 
            ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(oriDataSource);
        sqlSessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:mybatis/mybatis-config.xml"));
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mybatis/oriMapper/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }
 
    @Bean(name = "oriSqlSessionTemplate")
    @Primary
    public SqlSessionTemplate oriSqlSessionTemplate(SqlSessionFactory oriSqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(oriSqlSessionFactory);
    }
	
}
