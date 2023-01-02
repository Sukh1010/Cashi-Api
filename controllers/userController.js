import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "../config/nodemailerConfig.js";

async function getusers(req, res) {
  try {
    let data = await User.find()
      .limit(req.query.limit || 3)
      .skip(req.query.page || 0)
      .sort({ createdAt: -1 });
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
// http://localhost:9000/api/users?page=2,api/users?page=1&limit=10, /api/users?sort=-1
async function getuserById(req, res) {
  try {
    let { id } = req.params;
    let data = await User.findById(id);
    res.status(200).send({ status: "success", data, response: 200 });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function createuser(req, res) {
  try {
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    let data = await User.create(req.body);

    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateuser(req, res) {
  try {
    let { id } = req.params;
    let data = await User.findByIdAndUpdate(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteuser(req, res) {
  try {
    let { id } = req.params;
    let data = await User.findByIdAndRemove(id, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
//login user only jiska data pehle se save hoga
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email, password });
    if (!User) res.send("User not Found");
    let token = jwt.sign({ User }, process.env.JWT_SECRET);

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      userData,
      token,
    });
  } catch (error) {}
}
async function logoutuser(req, res, next) {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
}

//forget pasword + send token + update password from token

async function sendForgotPasswordMail(req, res) {
  try {
    let { email } = req.query;
    let result = await User.findOne({ email: email });
    if (!result) return res.status(401).send("Email doesnot exits");

    //crete token
    let token = jwt.sign({ user: result }, process.env.JWT_SECRET);
    console.log(token);
    //send token to users mail

    var message = {
      to: email,
      subject: "Forgot Password",
      from: "server@server.com",
      text: "Reset Password",
      html: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
	<!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
	<!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		@media (max-width:670px) {
			.row-content {
				width: 100% !important;
			}

			.column .border {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}
		}
	</style>
</head>

<body style="background-color: #000000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3e6f8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="padding-bottom:15px;padding-top:15px;width:100%;padding-right:0px;padding-left:0px;">
																<div align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/yourlogopassword.png" style="display: block; height: auto; border: 0; width: 195px; max-width: 100%;" width="195" alt="your logo" title="your logo"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3e6f8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/ResetPassword_BG_2.png'); background-position: center top; background-repeat: no-repeat; color: #000000; width: 650px;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 45px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="divider_block" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td>
																<div align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="image_block" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td>
																<div align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/lock5.png" style="display: block; height: auto; border: 0; width: 358px; max-width: 100%;" width="358" alt="Forgot your password?" title="Forgot your password?"></div>
															</td>
														</tr>
													</table>
													<table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td style="padding-top:35px;text-align:center;width:100%;">
																<h1 style="margin: 0; color: #8412c0; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 28px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>Forgot your password?</strong></h1>
															</td>
														</tr>
													</table>
													<table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td style="padding-left:45px;padding-right:45px;padding-top:10px;">
																<div style="font-family: Arial, sans-serif">
																	<div style="font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
																		<p style="margin: 0; text-align: center; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 27px;"><span style="font-size:18px;color:#aa67cf;">We received a request to reset your password.</span></p>
																		<p style="margin: 0; text-align: center; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 27px;"><span style="font-size:18px;color:#aa67cf;">If you didn't make this request, simply ignore this email.</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="divider_block" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td>
																<div align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #E1B4FC;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td style="padding-bottom:10px;padding-left:45px;padding-right:45px;padding-top:10px;">
																<div style="font-family: Arial, sans-serif">
																	<div style="font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;"><span style="font-size:13px;color:#8412c0;">If you did make this request just click the button below:</span></div>
																</div>
															</td>
														</tr>
													</table>
													<table class="button_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td>
																<div align="center">
																	<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com" style="height:54px;width:223px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#8412c0" fillcolor="#8412c0"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:14px"><![endif]-->
                                  <a href="http://localhost:9000/api/users/password/reset?token=${token}"
                                   target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#8412c0;border-radius:0px;width:auto;border-top:1px solid #8412c0;border-right:1px solid #8412c0;border-bottom:1px solid #8412c0;border-left:1px solid #8412c0;padding-top:10px;padding-bottom:10px;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:14px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 32px;"><span style="font-size: 14px; line-height: 28px;" data-mce-style="font-size: 14px; line-height: 28px;">RESET MY PASSWORD</span></span></span></a>
																	<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																</div>
															</td>
														</tr>
													</table>
													<table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
																<div style="font-family: Arial, sans-serif">
																	<div style="font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2;">
																		<p style="margin: 0; font-size: 14px; text-align: center; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;"><span style="font-size:10px;color:#aa67cf;"><span style>If you didn't request to change your brand password, </span><span style>you don't have to do anything. So that's easy.</span></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;">
																<div style="font-family: sans-serif">
																	<div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #8412c0; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
																		<p style="margin: 0; font-size: 14px; text-align: center;"><span style="color:#8a3b8f;">yourlogo © ·</span><span style> </span><span style><a href="http://[unsubscribe]/" target="_blank" rel="noopener" style="color: #8412c0;">Unsuscribe</a></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3e6f8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="divider_block" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td>
																<div align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td>
																<div style="font-family: sans-serif">
																	<div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #8412c0; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
																		<p style="margin: 0; text-align: center;"><span style="font-size:11px;color:#8a3b8f;">Duis euismod neque at lacus rutrum, nec suscipit eros tincidunt nterdum et malesuada.</span></p>
																		<p style="margin: 0; text-align: center;"><span style="font-size:11px;color:#8a3b8f;">Fames ac ante ipsum vestibulum.</span></p>
																		<p style="margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; text-align: center;"><span style="font-size:11px;"><span style="color:#8a3b8f;">Your Street 12, 34567 AB City&nbsp; /&nbsp;&nbsp;info@example.com /&nbsp;(+1) 123 456 789</span><a href="http://www.example.com" style="color: #8412c0;"></a></span></p>
																		<p style="margin: 0; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="social_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td>
																<table class="social-table" width="72px" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/facebook@2x.png" width="32" height="32" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
																		<td style="padding:0 2px 0 2px;"><a href="https://www.twitter.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>`,
    };
    await nodemailer.sendMail(message);
    res.status(200).send("Mail sent successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// get localhost:9000/api/users/password/reset?email=login2@test.com-----and html de vich url change krna --href="http://localhost:9000/api/users/password/reset?token=${token}
async function recieveForgotMailPassword(req, res) {
  try {
    let { token } = req.query;
    console.log("token", token);
    let { newPassword } = req.body;
    let { user } = jwt.decode(token, process.env.JWT_SECRET);
    let result = await User.findByIdAndUpdate(user._id, {
      password: newPassword,
    });
    res.status(200).send("Password updated successfully");
  } catch (error) {}
}
//FOR-RESet PASSWOrd::::: put ch http://localhost:9000/api/users/password/reset?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6iG6C4z_TcPzAjU6Jpn3M_XC3SztTI2OkI, BODY CH::: {newPassword:123}

export {
  getusers,
  getuserById,
  createuser,
  updateuser,
  deleteuser,
  loginUser,
  logoutuser,
  sendForgotPasswordMail,
  recieveForgotMailPassword,
};
