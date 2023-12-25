import { Navigate, createBrowserRouter } from "react-router-dom";

import AppLayout from "./modules/app/AppLayout";
import ProtectedComponent from "./modules/app/ProtectComponent";
import { LoginPage } from "./modules/auth";
import { FunctionPage, RolePage } from "./modules/authorization";
import { BookPage } from "./modules/book";
import { BranchManagePage } from "./modules/branch";
import { DashboardPage } from "./modules/dashboard";
import { EmployeePage } from "./modules/employee";
import { ErrorBoundaryPage } from "./modules/error/boundary";
import { ExperienceRegisterPage } from "./modules/experience-register";
import { FaqManagePage } from "./modules/faq";
import { GrowthArticlePage } from "./modules/growth-article";
import { GrowthStoryPage } from "./modules/growth-story";
import { HistoryPage } from "./modules/history";
import { LateStoryPage } from "./modules/late-story";
import { LicensePage } from "./modules/license-of-invention";
import { NewPwPage } from "./modules/new-password";
import { ObesityStoryPage } from "./modules/obesity-story";
import { OrganizationPage } from "./modules/organization";
import { PageManagePage } from "./modules/page";
import { PositionPage } from "./modules/position";
import { PostureStoryPage } from "./modules/posture-story";
import RequestManage from "./modules/request/RequestManage";
import { ResearchArticlePage } from "./modules/research-article";
import { ResearcherPage } from "./modules/researcher";
import { SlideManagePage } from "./modules/slide";
import { VideoPage } from "./modules/video";
import {
  ADMIN_URL,
  BOOK_URL,
  BRANCH_URL,
  CONFIG_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  FUNCTION_URL,
  GROWTH_ARTICLE_URL,
  GROWTH_STORY_URL,
  HISTORY_URL,
  HOME_URL,
  LATE_STORY_URL,
  LICENSE_OF_INVENTION_URL,
  LOGIN_URL,
  MANAGER_URL,
  NEW_PASSWORD_URL,
  OBESITY_STORY_URL,
  ORGANIZATION_URL,
  PAGE_URL,
  POSITION_URL,
  POSTURE_STORY_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  RESEARCH_ARTICLE_URL,
  ROLE_URL,
  SLIDES_URL,
  VIDEO_URL,
} from "./urls";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <AppLayout>
        <ErrorBoundaryPage />
      </AppLayout>
    ),
    children: [
      // {
      //   path: "/",
      //   element: <Navigate to={HOME_URL} />,
      // },
      {
        path: HOME_URL,
        element: (
          <ProtectedComponent
            Element={DashboardPage}
            title="Trang chủ"
            url={HOME_URL}
          />
        ),
      },

      // Manager
      {
        path: MANAGER_URL,
        element: <Navigate to={EXPERIENCE_REGISTER_URL} />,
      },
      {
        path: EXPERIENCE_REGISTER_URL,
        element: (
          <ProtectedComponent
            Element={ExperienceRegisterPage}
            title="Quản lý đăng ký trải nghiệm"
            url={EXPERIENCE_REGISTER_URL}
          />
        ),
      },
      {
        path: BRANCH_URL,
        element: (
          <ProtectedComponent
            Element={BranchManagePage}
            title="Quản lý chi nhánh"
            url={BRANCH_URL}
          />
        ),
      },

      {
        path: FAQ_URL,
        element: (
          <ProtectedComponent
            Element={FaqManagePage}
            title="Quản lý câu hỏi thường gặp"
            url={FAQ_URL}
          />
        ),
      },
      {
        path: RESEARCHER_URL,
        element: (
          <ProtectedComponent
            Element={ResearcherPage}
            title="Quản lý nhà nghiên cứu"
            url={RESEARCHER_URL}
          />
        ),
      },
      {
        path: REQUEST_URL,
        element: (
          <ProtectedComponent
            Element={RequestManage}
            title="Quản lý yêu cầu"
            url={REQUEST_URL}
          />
        ),
      },
      {
        path: GROWTH_STORY_URL,
        element: (
          <ProtectedComponent
            Element={GrowthStoryPage}
            title="Quản lý câu chuyện tăng trưởng"
            url={GROWTH_STORY_URL}
          />
        ),
      },
      {
        path: POSTURE_STORY_URL,
        element: (
          <ProtectedComponent
            Element={PostureStoryPage}
            title="Quản lý trường hợp chỉnh sửa tư thế"
            url={POSTURE_STORY_URL}
          />
        ),
      },
      {
        path: LATE_STORY_URL,
        element: (
          <ProtectedComponent
            Element={LateStoryPage}
            title="Quản lý trường hợp trễ hạn"
            url={LATE_STORY_URL}
          />
        ),
      },
      {
        path: OBESITY_STORY_URL,
        element: (
          <ProtectedComponent
            Element={ObesityStoryPage}
            title="Quản lý trường hợp béo phì"
            url={OBESITY_STORY_URL}
          />
        ),
      },
      {
        path: LICENSE_OF_INVENTION_URL,
        element: (
          <ProtectedComponent
            Element={LicensePage}
            title="Quản lý bằng sáng chế"
            url={LICENSE_OF_INVENTION_URL}
          />
        ),
      },
      {
        path: BOOK_URL,
        element: (
          <ProtectedComponent
            Element={BookPage}
            title="Quản lý sách xuất bản"
            url={BOOK_URL}
          />
        ),
      },
      {
        path: RESEARCH_ARTICLE_URL,
        element: (
          <ProtectedComponent
            Element={ResearchArticlePage}
            title="Quản lý bài nghiên cứu"
            url={RESEARCH_ARTICLE_URL}
          />
        ),
      },
      {
        path: HISTORY_URL,
        element: (
          <ProtectedComponent
            Element={HistoryPage}
            title="Quản lý lịch sử"
            url={HISTORY_URL}
          />
        ),
      },
      {
        path: ORGANIZATION_URL,
        element: (
          <ProtectedComponent
            Element={OrganizationPage}
            title="Quản lý sơ đồ tổ chức"
            url={ORGANIZATION_URL}
          />
        ),
      },
      {
        path: VIDEO_URL,
        element: (
          <ProtectedComponent
            Element={VideoPage}
            title="Quản lý TV"
            url={VIDEO_URL}
          />
        ),
      },
      {
        path: GROWTH_ARTICLE_URL,
        element: (
          <ProtectedComponent
            Element={GrowthArticlePage}
            title="Quản lý câu hỏi tăng trưởng"
            url={GROWTH_ARTICLE_URL}
          />
        ),
      },

      // Config
      {
        path: CONFIG_URL,
        element: <Navigate to={SLIDES_URL} />,
      },
      {
        path: PAGE_URL,
        element: (
          <ProtectedComponent
            Element={PageManagePage}
            title="Quản lý các trang"
            url={PAGE_URL}
          />
        ),
      },
      {
        path: SLIDES_URL,
        element: (
          <ProtectedComponent
            Element={SlideManagePage}
            title="Quản lý slides"
            url={SLIDES_URL}
          />
        ),
      },

      // Admin
      {
        path: ADMIN_URL,
        element: <Navigate to={EMPLOYEE_URL} />,
      },
      {
        path: EMPLOYEE_URL,
        element: (
          <ProtectedComponent
            Element={EmployeePage}
            title="Quản lý nhân viên"
            url={EMPLOYEE_URL}
          />
        ),
      },
      {
        path: POSITION_URL,
        element: (
          <ProtectedComponent
            Element={PositionPage}
            title="Quản lý vị trí / chức vụ"
            url={POSITION_URL}
          />
        ),
      },
      {
        path: BRANCH_URL,
        element: (
          <ProtectedComponent
            Element={BranchManagePage}
            title="Quản lý chi nhánh"
            url={BRANCH_URL}
          />
        ),
      },
      {
        path: FUNCTION_URL,
        element: (
          <ProtectedComponent
            Element={FunctionPage}
            title="Quản lý chức năng"
            url={FUNCTION_URL}
          />
        ),
      },
      {
        path: ROLE_URL,
        element: (
          <ProtectedComponent
            Element={RolePage}
            title="Quản lý nhóm quyền"
            url={ROLE_URL}
          />
        ),
      },
    ],
  },
  {
    path: LOGIN_URL,
    element: (
      <ProtectedComponent Element={LoginPage} title="Đăng nhập" url={""} />
    ),
  },
  {
    path: NEW_PASSWORD_URL,
    element: (
      <ProtectedComponent Element={NewPwPage} title="Mật khẩu mới" url={""} />
    ),
  },
]);
