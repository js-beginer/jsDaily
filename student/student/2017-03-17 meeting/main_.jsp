<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%  
  Object username = session.getAttribute("username");  
  if("".equals(username) || null == username){  
     response.sendRedirect("");
  }  
%>  
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit">
		<title>会议室预约系统</title>
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
  	</head>
	<body>
		<div id="meetApp">
			<nav class="navbar navbar-default">
				<div class="nav-header">
			      	<img style="width: 50px;height: 40px;" src="<%=path%>/image/logoD.png" />
			      	<span>欢迎来到<b>会议室预约系统</b></span>
			    </div>
				<ul class="nav-body">
				    <li><a href="javascript:;" >{{loginName}}</a></li>
				    <li><a href="javascript:;">Hello</a></li>
				</ul>
			</nav>
			<div class="main">
				<div class="box meet-left">
					<div class="zone date">
						 <div id="datepicker"></div>
					</div>
					<div class="zone instruct">
						<div class="instBtn">
							
							<div class="instBtn-box" @click="orderView" id="gotoToday">
								<a href="javascript:;"><img src="<%=path%>/image/todaye.png" onmouseover="this.src='<%=path%>/image/today2.png'" onmouseout="this.src='<%=path%>/image/todaye.png'" /></a>
								<span>回到今日</span>
							</div>
							<div class="instBtn-box" @click="myOrderList">
								<a href="javascript:;"><img src="<%=path%>/image/mye.png" onmouseover="this.src='<%=path%>/image/my2.png'" onmouseout="this.src='<%=path%>/image/mye.png'" /></a>
								<span>我的预约</span>
							</div>
						</div>
						<table>
							<tr>
								<td>18F:</td>
								<td><div style="background: #845871;"></div></td>
								<td><div style="background: #92A08F;"></div></td>
							</tr>
							<tr>
								<td>31F:</td>
								<td><div style="background: #FC9A3F;"></div></td>
								
							</tr>
							<tr>
								<td>33F:</td>
								<td><div style="background: #E34856;"></div></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="box meet-right">
					<div class="zone order">
						<!--行程表格-->
						<div class="show-table" v-if="!myOrderFlag">
							<div class="table-nav">
								<div class="table-header" id="alternate">{{orderList.chooseDate}} <b>{{orderList.week}}</b></div>
							</div>
							<div id="orderTable" class="order-table">
								<ul class="order-thead">
									<li></li>
									<li></li>
									<li>9:00</li>
									<li></li>
									<li>10:00</li>
									<li></li>
									<li>11:00</li>
									<li></li>
									<li>12:00</li>
									<li></li>
									<li>13:00</li>
									<li></li>
									<li>14:00</li>
									<li></li>
									<li>15:00</li>
									<li></li>
									<li>16:00</li>
									<li></li>
									<li>17:00</li>
								</ul>
								<!-- 页面表格li  -->
								<div id="liBoxClass">
									<ul class="room" v-for="roomItem in roomNum">
										<li>{{arrText[roomItem - 1]}}</li>
										<li class="room-item" :class="{'add':addIcon(roomItem,liItem)}" @click="addConfirm(roomItem,liItem)" v-for="liItem in liNum">
											<i v-if="addIcon(roomItem,liItem)" class="el-icon-plus"></i>
										</li>
										<li></li>
									</ul>
								</div>
								<!-- 预约定位项  -->
								<div class="orderBox"  v-for="item in orderList.list">
									
									<div class="move" v-on:click="resConfirm(item)"  v-bind:style="orderStyle(item.conf_id,item.appointment_begin_time,item.appointment_end_time)">
										<el-tooltip :content="item.content" placement="top" effect="light">
											<div>
											<span>{{item.appointment_begin_time | timeSort}}</span>
											<span>~</span>
											<span>{{item.appointment_end_time | timeSort}}</span>
											<span>{{item.user_name}}</span>
											</div>
										</el-tooltip>
									</div>
									
								</div>
							</div>
						</div>
						<!--我的预约-->
						<div class="my-table" v-if="myOrderFlag">
							<div class="table-nav">
								<el-dropdown trigger="click">
								  <span class="el-dropdown-link">
								    <i class="el-icon-arrow-down el-icon--right"></i>
								  </span>
								  <el-dropdown-menu slot="dropdown">
								    <el-dropdown-item><span @click="myOrderList(0)">按时间排序</span></el-dropdown-item>
								    <el-dropdown-item><span @click="myOrderList(1)">按添加排序</span></el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
								<div class="table-header">我的预约</div>
							</div>
							
							<div class="order-table">
								<ul class="order-table-list">
									<li class="my-list" v-for="(list,index) in currentList" >
										<div v-bind:style="listStyle(list.conf_id)"></div>
										<div>
											<div class="my-list-left">
												<b>{{list.list_num}}</b>
												<span class="my-list-left-username">{{list.user_name}}</span>
												<span>{{list.appointment_date}}</span>
												<span>{{list.week}}</span>
												<span>{{list.appointment_begin_time | timeSort}}-{{list.appointment_end_time | timeSort}}</span>
												<span>{{list.content}}</span>
											</div>
											<div class="my-list-right">
												
												<el-button type="text" class="my-list-right-re" @click="resMyOrder(list)">修改</el-button>
												<el-button type="text" class="my-list-right-del" @click="delMyOrderList(list.order_number,list.user_name,list.appointment_end_time,index)" :loading="list.deleteLoading">删除</el-button>
											</div>
										</div>
										<div v-bind:style="listStyle(list.conf_id)"></div>
									</li>
								</ul>
								<div class="order-table-pagination">
									<el-pagination layout="prev, pager, next" :page-size="pageInfo.pageSize" :current-page.sync="pageInfo.currentPage" :total="orderList.total" @current-change="paginationList"></el-pagination>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="md-overlay" v-if="addFlag||resFlag||xqFlag||resMyOrderListFlag"></div>
				<!--添加预约遮罩层-->
				<div class="modal" v-bind:class="{'md-show':addFlag}">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h4>添加预约</h4>
								<div class="yourDate">{{this.myDate}}</div>
								<button class="close" data-dismiss="modal" @click="addFlagCancel('ruleForm1')">&times;</button>
							</div>
							<div class="modal-body">
								<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" >
									<div class="form-group has-feedback text-center">
										<div class="order-time">
											<div v-show="isTimeRule" class="timeRule">*</div>
											<div class="order-box">
												<h1>开始时间</h1>
												<el-form-item prop="beginTimeNew" >
													<el-time-select class="deleI" :editable='false' v-model="ruleForm1.beginTimeNew" :picker-options="{start: '08:30',step: '00:30',end: '17:00' , minTime:startTimeMin}" placeholder="选择时间"></el-time-select>
												</el-form-item>
											</div>
											<div class="order-box">
												<h1>结束时间</h1>
												<el-form-item prop="endTimeNew" >
													<el-time-select class="deleI" :editable='false' v-model="ruleForm1.endTimeNew" :picker-options="{start: '08:30',step: '00:30',end: '17:00', minTime: endTimeMin}" placeholder="选择时间"></el-time-select>
												</el-form-item>
											</div>
										</div>
										<div class="order-text">
											<div>
												<el-form-item prop="userNameNew">
													<el-input v-model="ruleForm1.userNameNew" readonly="readonly"  class="order-peaple" placeholder="预约人（1~5字符）"></el-input>
												</el-form-item>
											</div>
											<div>
												<el-form-item prop="contentNew">
													<el-input v-model="ruleForm1.contentNew"  class="order-content" type="textarea" placeholder="会议内容（1~40字符）" :maxlength="40" :autofocus="true"></el-input>
												</el-form-item>
											</div>
										</div>
									</div>
									<div class="form-group text-center">
										<el-form-item prop="meetRoomNew" class="roomChoose">
											<el-select v-model="ruleForm1.meetRoomNew" placeholder="选择会议室">
												<el-option label="18层(大)" value="1"></el-option>
												<el-option label="18层(小）" value="2"></el-option>
												<el-option label="31层" value="3"></el-option>
												<el-option label="33层" value="4"></el-option>
											</el-select>
										</el-form-item>
										<div class="orderPoint" v-show="erRoom">会议室已被占用！此时空闲会议室为：{{this.orderPoint}}</div>
										<div class="btnChoose">
											<el-form-item>
												<el-button type="primary" class="order-ok" plain @click="addOrder('ruleForm1')" :loading="myLoadingOk">确定</el-button>
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
								<h4>修改预约</h4>
								<div class="yourDate">{{this.myDate}}</div>
								<button class="close" data-dismiss="modal" @click="resFlagCancel('ruleForm')">&times;</button>
							</div>
							<div class="modal-body">
								<el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
									<div class="form-group has-feedback text-center">
										<div class="order-time">
											<div v-show="isTimeRule" class="timeRule">*</div>
											<div class="order-box">
												<h1>开始时间</h1>
												<el-form-item prop="beginTime" required >
													<el-time-select class="deleI" :editable='false' v-model="ruleForm.beginTime" :picker-options="{start: '08:30',step: '00:30',end: '17:00', minTime:startTimeMin}" placeholder="选择时间"></el-time-select>
												</el-form-item>
											</div>
											<div class="order-box">
												<h1>结束时间</h1>
												<el-form-item prop="endTime" required >
													<el-time-select class="deleI" :editable='false' v-model="ruleForm.endTime" :picker-options="{start: '08:30',step: '00:30',end: '17:00', minTime: endTimeMin0}" placeholder="选择时间"></el-time-select>
												</el-form-item>
											</div>
										</div>
										<div class="order-text">
											<div>
												<el-form-item prop="userName">
													<el-input v-model="ruleForm.userName" readonly="readonly"  class="order-peaple"></el-input>
												</el-form-item>
											</div>
											<div>
												<el-form-item prop="content">
													<el-input v-model="ruleForm.content"  class="order-content" type="textarea" placeholder="会议内容（1~40字符）" :maxlength="40" ></el-input>
												</el-form-item>
											</div>
										</div>
									</div>
									<div class="form-group text-center">
										<el-form-item prop="meetRoom" class="roomChoose">
											<el-select v-model="ruleForm.meetRoom" placeholder="选择会议室" class="deleI">
												<el-option label="18层(大)" value="1"></el-option>
												<el-option label="18层(小)" value="2"></el-option>
												<el-option label="31层" value="3"></el-option>
												<el-option label="33层" value="4"></el-option>
											</el-select>
										</el-form-item>
										<div class="orderPoint" v-show="erRoom">会议室已被占用！此时空闲会议室为：{{this.orderPoint}}</div>
										
										<div class="btnChoose">
											<el-form-item>
												<el-popover ref="popover5" placement="top" width="160" v-model="deleTips">
												  <p>确定删除这个预约吗？</p>
												  <div style="text-align: right; margin: 0">
												    <el-button size="mini" type="text" @click="deleTips = false">取消</el-button>
												    <el-button type="primary" size="mini" @click="delConfirm" :loading="myLoadingDel">确定</el-button>
												  </div>
												</el-popover>
												<el-button type="danger" class="order-del" v-popover:popover5 :loading="myLoadingDel">删除</el-button>
											</el-form-item>
											
				               				<el-form-item>
												<el-button type="primary" class="order-ok" plain @click="resOrder('ruleForm')" :loading="myLoadingOk">确定</el-button>
											</el-form-item>
										</div>
									</div>
								</el-form>
							</div>
						</div>
					</div>
				</div>
				<!--我的预约-修改预约遮罩层-->
				<div class="modal" v-bind:class="{'md-show':resMyOrderListFlag}">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h4>修改预约</h4>
								<div class="yourDate">{{this.ruleForm.myYearFull}}</div>
								<button class="close" data-dismiss="modal" @click="resMyOrderListFlagCancel('ruleForm')">&times;</button>
							</div>
							<div class="modal-body">
								<el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
									<div class="form-group has-feedback text-center">
										<div class="order-time">
											<div v-show="isTimeRule" class="timeRule">*</div>
											<div class="order-box">
												<h1>开始时间</h1>
												<el-form-item prop="beginTime" required >
													<el-time-select class="deleI" :editable='false' v-model="ruleForm.beginTime" :picker-options="{start: '08:30',step: '00:30',end: '17:00', minTime:startTimeMin}" placeholder="选择时间"></el-time-select>
												</el-form-item>
											</div>
											<div class="order-box">
												<h1>结束时间</h1>
												<el-form-item prop="endTime" required >
													<el-time-select class="deleI" :editable='false' v-model="ruleForm.endTime" :picker-options="{start: '08:30',step: '00:30',end: '17:00', minTime: endTimeMin0}" placeholder="选择时间"></el-time-select>
												</el-form-item>
											</div>
										</div>
										<div class="order-text">
											<div>
												<el-form-item prop="userName">
													<el-input v-model="ruleForm.userName" readonly="readonly"  class="order-peaple"></el-input>
												</el-form-item>
											</div>
											<div>
												<el-form-item prop="content">
													<el-input v-model="ruleForm.content"  class="order-content"type="textarea" placeholder="会议内容（1~40字符）" :maxlength="40" ></el-input>
												</el-form-item>
											</div>
										</div>
									</div>
									<div class="form-group text-center">
										<el-form-item prop="meetRoom" class="roomChoose">
											<el-select v-model="ruleForm.meetRoom" placeholder="选择会议室" class="deleI">
												<el-option label="18层(大)" value="1"></el-option>
												<el-option label="18层(小)" value="2"></el-option>
												<el-option label="31层" value="3"></el-option>
												<el-option label="33层" value="4"></el-option>
											</el-select>
										</el-form-item>
										<div class="orderPoint" v-show="erRoom">会议室已被占用！此时空闲会议室为：{{this.orderPoint}}</div>
										<div class="btnChoose">
				               				<el-form-item>
												<el-button type="primary" class="order-ok" plain @click="resMyOrderList('ruleForm')" :loading="myLoadingOk">确定</el-button>
											</el-form-item>
										</div>
									</div>
								</el-form>
							</div>
						</div>
					</div>
				</div>
				<!--详情弹出框-->
				<div class="modal" v-bind:class="{'md-show':xqFlag}">
					<div class="modal-dialog xqShow">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm3" >
							<div class="modal-content">
								<div class="modal-header">
									<h4>预约详情</h4>
									<el-button class="pen" @click="revisePen" :disabled="revise" icon="edit"></el-button>
									<button type="button" class="close" data-dismiss="modal" @click="xqFlagCancel('ruleForm3')">&times;</button>
									<div class="time-box">
										<div class="date-box">
											<div class="myDD">
												{{ruleForm.myDD}}
											</div>
											<div class="myYear">
												{{ruleForm.myYear}}
											</div>
										</div>
										<div class="time-region">
											<div class="timeReZ time-region-start">
												<el-form-item prop="beginTime">
													<el-time-select class="deleI" :editable='false' :readonly="readonlyPen" v-model="ruleForm.beginTime" :picker-options="{start: '08:30',step: '00:30',end: '17:00'}"></el-time-select>
												</el-form-item>
											</div>
											<div class="timeReZ time-region-0">-</div>
											<div class="timeReZ time-region-end">
												<el-form-item prop="endTime">
													<el-time-select class="deleI" :editable='false' :readonly="readonlyPen" v-model="ruleForm.endTime" :picker-options="{start: '08:30',step: '00:30',end: '17:00', minTime: endTimeMin}" ></el-time-select>
												</el-form-item>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-body">
										<div class="order-list">
											<i class="glyphicon glyphicon-user"></i>
											<div class="ordList">
												<el-form-item prop="userName" >
													<el-input v-model="ruleForm.userName"  readonly="readonly" ></el-input>
												</el-form-item>
											</div>
										</div>
										<div class="order-list">
											<i class="glyphicon glyphicon-map-marker"></i>
											<div class="ordList">
												<el-form-item prop="meetRoom" :disabled="disabledPen">
													<el-select v-model="ruleForm.meetRoom" :disabled="disabledPen">
														<el-option label="18层(大)" value="1"></el-option>
														<el-option label="18层(小)" value="2"></el-option>
														<el-option label="31层" value="3"></el-option>
														<el-option label="33层" value="4"></el-option>
													</el-select>
												</el-form-item>
											</div>
										</div>
										<div class="order-list">
											<i class="glyphicon glyphicon-list-alt"></i>
											<div class="ordList">
												<el-form-item prop="content">
													<el-input type="textarea" v-model="ruleForm.content" :readonly="readonlyPen" placeholder="会议内容（1~40字符）" :maxlength="40" :autofocus="true"></el-input>
												</el-form-item>
											</div>
											<div class="orderPoint" v-show="erRoom">会议室已被占用！此时空闲会议室为：{{this.orderPoint}}</div>
											<div class="btnChoose">
												<el-form-item>
													<el-popover v-if="!readonlyPen" ref="popover5" placement="top" width="160" v-model="deleTips">
													  <p>确定删除这个预约吗？</p>
													  <div style="text-align: right; margin: 0">
													    <el-button size="mini" type="text" @click="deleTips = false">取消</el-button>
													    <el-button type="primary" size="mini" @click="delConfirm" :loading="myLoadingDel">确定</el-button>
													  </div>
													</el-popover>
													<div v-if="!readonlyPen" class="btnPen order-del" v-popover:popover5  :loading="myLoadingDel"><i class="el-icon-delete"></i></div>
													<div v-if="!readonlyPen" class="btnPen order-ok" :loading="myLoadingOk" @click="resOrder('ruleForm')"><i class="el-icon-check"></i></div>
												</el-form-item>
												
											</div>
										</div>
								</div>
							</div>
						</el-form>
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

