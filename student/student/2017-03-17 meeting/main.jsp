<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>会议室预定系统</title>
		<link rel="stylesheet" href="<%=path%>/style/index.css" />	
		<link rel="stylesheet" href="<%=path%>/style/vendor/bootstrap.css"/>
		<link rel="stylesheet" href="<%=path%>/style/vendor/element-ui.css"/>
		<script src="<%=path%>/script/vendor/jquery-3.2.0.min.js"></script>
		<script src="<%=path%>/script/vendor/jquery.placeholder.js"  type="text/javascript"></script>
		<!--timepicker-->
		<link rel="stylesheet" href="<%=path%>/style/vendor/jquery-ui-1.11.4.css"/>
	    <script src="<%=path%>/script/vendor/jquery-1.11.1.js"></script>
		<script src="<%=path%>/script/vendor/jquery-ui-1.11.4.js"></script>
		<script src="<%=path%>/script/vendor/jquery-ui-timepicker-addon.js"></script>
  		<script src="<%=path%>/script/vendor/jquery.ui.datepicker-zh-CN.js"  type="text/javascript"></script>
  		<style>
			.el-form-item__error{
				position: absolute;
				top: 10px;
				left: -20px;
				font-size: 20px;
			}	
			.el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-textarea__inner {
				 border-color: #bfcbd9; 
			}
			.el-date-editor.el-input {
				margin-left: 4px;
			    width: 105px;
			   
			}
			.el-input__inner{
				border:1px dashed #CACACB;
				height: 40px;
				/*line-height: -1; */
			}
			.el-date-editor.el-input  .el-input__inner{
				 border: none;
			}
			.time-select-item {
			    padding: 8px 28px;
			}
		</style>
	</head>
	<body>
		<div id="meetApp">
			<nav class="navbar navbar-default">
				<div class="nav-header">
			      	<img src="<%=path%>/image/logo.png" />
			    </div>
				<ul class="nav-body">
				    <li><a href="#">退出</a></li>
				    <li><a href="#">Hello</a></li>
				</ul>
			</nav>
			<div class="main">
				<div class="box meet-left">
					<div class="zone date">
						 <div id="datepicker"></div>
					</div>
					<div class="zone instruct">
						<table>
							<tr>
								<td>18F:</td>
								<td><div style="background: #845871;">大</div></td>
								<td><div style="background: #92A08F;">小</div></td>
							</tr>
							<tr>
								<td>33F:</td>
								<td><div style="background: #FC9A3F;">大</div></td>
								<td><div style="background: #E34856;">小</div></td>
							</tr>
							<tr>
								<td>31F:</td>
								<td><div style="background: #065381;"></div></td>
							</tr>
						</table>
						<div class="instBtn">
							<div class="instBtn-box">
								<input type="button" class="btn" @click="orderView"   id="gotoToday" value="回到今日" />
							</div>
							<div class="instBtn-box">
								<input type="button" class="btn" @click="addConfirm" value="添加预约">
							
							</div>
						</div>
					</div>
				</div>
				<div class="box meet-right">
					<div class="zone order">
						<div class="order-date" id="alternate">{{orderList.chooseDate}}</div>
						<div id="orderTable">
							<ul class="order-thead">
								<li></li>
								<li>8:30</li>
								<li>9:00</li>
								<li>9:30</li>
								<li>10:00</li>
								<li>10:30</li>
								<li>11:00</li>
								<li>11:30</li>
								<li>12:00</li>
								<li>12:30</li>
								<li>13:00</li>
								<li>13:30</li>
								<li>14:00</li>
								<li>14:30</li>
								<li>15:00</li>
								<li>15:30</li>
								<li>16:00</li>
								<li>16:30</li>
								<li>17:00</li>
							</ul>
							<div id="liBoxClass" v-html="this.allText"></div>
	
							<div class="orderBox"  v-for="item in orderList.list">
								<div class="move"   v-on:click="resConfirm(item)"  v-bind:style="orderStyle(item.conf_id,item.appointment_begin_time,item.appointment_end_time)">
									<span>{{item.appointment_begin_time | timeSort}}</span>
									<span>~</span>
									<span>{{item.appointment_end_time | timeSort}}</span>
									<span>{{item.user_name}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!--添加预约遮罩层-->
				<div class="modal" v-bind:class="{'md-show':addFlag}">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<div>添加预约</div>
								<button class="close" data-dismiss="modal" @click="addFlag=false">&times;</button>
							</div>
							<div class="modal-body">
								<el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
									<div class="form-group has-feedback text-center">
										<div class="order-time">
											<div class="order-box">
												<h1>开始时间</h1>
													<el-form-item prop="startTimeNew" required >
														<el-time-select  v-model="ruleForm.startTimeNew" :picker-options="{start: '08:30',step: '00:30',end: '17:00'}" placeholder="选择时间"></el-time-select>
													</el-form-item>
											</div>
											<div class="order-box">
												<h1>结束时间</h1>
												<el-form-item prop="endTimeNew" required >
													<el-time-select  v-model="ruleForm.endTimeNew" :picker-options="{start: '08:30',step: '00:30',end: '17:00'}" placeholder="选择时间"></el-time-select>
												</el-form-item>
											</div>
										</div>
										<div class="order-text">
											<div>
												<el-form-item prop="userNameNew">
													<el-input v-model="ruleForm.userNameNew"  class="order-peaple" placeholder="预约人（1~5字符）"></el-input>
												</el-form-item>
											</div>
											<div>
												<el-form-item prop="contentNew">
													<el-input v-model="ruleForm.contentNew"  class="order-content" placeholder="会议内容（1~10字符）"></el-input>
												</el-form-item>
											</div>
										</div>
									</div>
									<div class="form-group text-center">
										<el-form-item prop="meetRoomNew" class="roomChoose">
											<el-select v-model="ruleForm.meetRoomNew" placeholder="选择会议室">
												<el-option label="第一会议室" value="1"></el-option>
												<el-option label="第二会议室" value="2"></el-option>
												<el-option label="第三会议室" value="3"></el-option>
												<el-option label="第四会议室" value="4"></el-option>
												<el-option label="第五会议室" value="5"></el-option>
											</el-select>
										</el-form-item>
										<div class="btnChoose">
											<el-form-item>
												<el-button type="primary" class="order-ok btn btn-success" @click="addOrder('ruleForm')">确定</el-button>
											</el-form-item>
										</div>
									</div>
								</el-form>
							</div>
						</div>
					</div>
				</div>
				
				<!--修改预约遮罩层-->
				<div class="modal" v-bind:class="{'md-show':resFlag}">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<div>修改预约</div>
								<button class="close" data-dismiss="modal" @click="resFlag=false">&times;</button>
							</div>
							<div class="modal-body">
								<form class="form-horizontal">
									<div class="form-group has-feedback text-center">
										<div class="order-time">
											<div class="order-box">
												<h1>开始时间</h1>
												<select v-model="beginTime">
													<option>08:30</option>
													<option>09:00</option>
													<option>09:30</option>
													<option>10:00</option>
													<option>10:30</option>
													<option>11:00</option>
													<option>11:30</option>
													<option>12:00</option>
													<option>12:30</option>
													<option>13:00</option>
													<option>13:30</option>
													<option>14:00</option>
													<option>14:30</option>
													<option>15:00</option>
													<option>15:30</option>
													<option>16:00</option>
													<option>16:30</option>
													<option>17:00</option>
												</select>
											</div>
											<div class="order-box">
												<h1>结束时间</h1>
												<select v-model="endTime">
													<option>08:30</option>
													<option>09:00</option>
													<option>09:30</option>
													<option>10:00</option>
													<option>10:30</option>
													<option>11:00</option>
													<option>11:30</option>
													<option>12:00</option>
													<option>12:30</option>
													<option>13:00</option>
													<option>13:30</option>
													<option>14:00</option>
													<option>14:30</option>
													<option>15:00</option>
													<option>15:30</option>
													<option>16:00</option>
													<option>16:30</option>
													<option>17:00</option>
												</select>
											</div>
										</div>
										<div class="order-text">
											<div>
												<input type="text" class="order-peaple" v-model="userName" placeholder="预约人">
											</div>
											<div>
												<input type="text" class="order-content" v-model="content"  placeholder="会议内容">
											</div>
										</div>
									</div>
									<div class="form-group text-center">
										<div class="roomChoose">第
											<select v-model="meetRoom">
												<option value="1">一</option>
												<option value="2">二</option>
												<option value="3">三</option>
												<option value="4">四</option>
												<option value="5">五</option>
											</select>
											会议室
										</div>
										<div class="btnChoose">
											<button type="button" @click="delConfirm" class="order-del btn btn-danger">
												删除
				               				</button>
				               				<button type="button" @click="resOrder" class="order-ok btn btn-success">
												确定
				               				</button>
										</div>
									</div>
								</form>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script src="<%=path%>/script/vendor/moment.js"></script>
	<script src="<%=path%>/script/vendor/vue.js"></script>
	<script src="<%=path%>/script/vendor/vue-resource.min.js"></script>
	<script src="<%=path%>/script/vendor/element-ui.js"></script>
	
	<script src="<%=path%>/script/index.js"></script>
</html>

