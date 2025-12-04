"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  DollarSign,
  Package,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  Zap,
  Truck,
  Users,
  Star,
} from "lucide-react";

export default function ReportsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Sales Report */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            Total Sales Report
          </h3>
          <div className="flex gap-2">
            <select className="input-field text-sm">
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold">R 2,847,500</p>
                <p className="text-green-200 text-sm">
                  +12.5% from last month
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Orders Completed
                </p>
                <p className="text-3xl font-bold">342</p>
                <p className="text-blue-200 text-sm">
                  +8.2% from last month
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Average Order Value
                </p>
                <p className="text-3xl font-bold">R 8,326</p>
                <p className="text-purple-200 text-sm">
                  +4.1% from last month
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">
                  Conversion Rate
                </p>
                <p className="text-3xl font-bold">68.4%</p>
                <p className="text-orange-200 text-sm">
                  +2.3% from last month
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue by Container Type
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Storage Containers
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    R 1,850,000
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Office Containers
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">R 712,000</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Refrigerated Containers
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">R 285,500</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Revenue Trend
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">January</span>
                <span className="font-medium">R 2,100,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">February</span>
                <span className="font-medium">R 2,350,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">March</span>
                <span className="font-medium">R 2,600,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">April</span>
                <span className="font-medium">R 2,847,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Time Report */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary-600" />
            Order to Delivery Time Analysis
          </h3>
          <div className="flex gap-2">
            <select className="input-field text-sm">
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="this-year">This Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">
                  Average Delivery Time
                </p>
                <p className="text-3xl font-bold">4.2 days</p>
                <p className="text-indigo-200 text-sm">
                  -0.8 days from last month
                </p>
              </div>
              <Clock className="w-8 h-8 text-indigo-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm font-medium">
                  Fastest Delivery
                </p>
                <p className="text-3xl font-bold">1.2 days</p>
                <p className="text-teal-200 text-sm">
                  Same day processing
                </p>
              </div>
              <Zap className="w-8 h-8 text-teal-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-100 text-sm font-medium">
                  On-Time Delivery
                </p>
                <p className="text-3xl font-bold">94.2%</p>
                <p className="text-rose-200 text-sm">
                  +2.1% from last month
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-rose-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Time Distribution
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Same Day (0-1 days)
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">1-3 days</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">3-7 days</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">7+ days</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Deliveries
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium text-sm">ORD-2024-001</p>
                  <p className="text-xs text-gray-500">
                    Storage Container
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    2.1 days
                  </p>
                  <p className="text-xs text-gray-500">On time</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium text-sm">ORD-2024-002</p>
                  <p className="text-xs text-gray-500">
                    Office Container
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">
                    3.5 days
                  </p>
                  <p className="text-xs text-gray-500">On time</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium text-sm">ORD-2024-003</p>
                  <p className="text-xs text-gray-500">
                    Refrigerated Container
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-yellow-600">
                    5.2 days
                  </p>
                  <p className="text-xs text-gray-500">Delayed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Performance Report */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-primary-600" />
            Driver Performance Report
          </h3>
          <div className="flex gap-2">
            <select className="input-field text-sm">
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">
                  Total Deliveries
                </p>
                <p className="text-3xl font-bold">127</p>
                <p className="text-emerald-200 text-sm">
                  +15% from last month
                </p>
              </div>
              <Truck className="w-8 h-8 text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm font-medium">
                  Active Drivers
                </p>
                <p className="text-3xl font-bold">8</p>
                <p className="text-cyan-200 text-sm">
                  2 new this month
                </p>
              </div>
              <Users className="w-8 h-8 text-cyan-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-100 text-sm font-medium">
                  Avg per Driver
                </p>
                <p className="text-3xl font-bold">15.9</p>
                <p className="text-violet-200 text-sm">
                  deliveries/month
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-violet-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">
                  Top Performer
                </p>
                <p className="text-3xl font-bold">23</p>
                <p className="text-amber-200 text-sm">deliveries</p>
              </div>
              <Star className="w-8 h-8 text-amber-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Driver Performance Rankings
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">John Smith</p>
                    <p className="text-xs text-gray-500">
                      Driver ID: D001
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">23</p>
                  <p className="text-xs text-gray-500">deliveries</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">
                      Driver ID: D002
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">19</p>
                  <p className="text-xs text-gray-500">deliveries</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mike Wilson</p>
                    <p className="text-xs text-gray-500">
                      Driver ID: D003
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">
                    17
                  </p>
                  <p className="text-xs text-gray-500">deliveries</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm">Lisa Brown</p>
                    <p className="text-xs text-gray-500">
                      Driver ID: D004
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-600">15</p>
                  <p className="text-xs text-gray-500">deliveries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Delivery Trends
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">January</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">89</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">February</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">104</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">March</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">127</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">April</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">127</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

