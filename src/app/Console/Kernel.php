<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\User;
use App\Models\Diary;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();

        $schedule->call(function () {
            //ゲストユーザーの一覧を取得する
            $users = User::where('is_guest', 1)->get();

            //ゲストユーザーアカウントとそれに紐づく日記を削除する
            foreach ( $users as $user )
            {
                //ゲストユーザーを削除する
                User::where('id', $user->id)->delete();

                //日記を削除する
                Diary::where('user_id', $user->id)->delete();
            }
            
        });
    }

    /**
     * スケジュールされたイベントで使用するデフォルトタイムゾーンの取得
     * 
     * @return \DateTimeZone | String | null
     */

     protected function scheduleTimezone()
     {
         return 'Asia/Tokyo';
     }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
