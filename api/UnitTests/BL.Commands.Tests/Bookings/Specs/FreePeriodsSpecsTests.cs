using BL.Commands.Bookings.Specs;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace BL.Commands.Tests.Bookings.Specs
{
    [TestFixture]
    public class FreePeriodsServiceTests
    {
        FreePeriodsService _service;

        [SetUp]
        public void Setup()
        {
            _service = new FreePeriodsService();
        }

        [Test]
        public void WhenStartIsBusy_UntilHalf_ReturnLastPeriod()
        {
            var shedulePeriod = new Period
            {
                Start = new TimeSpan(8, 0, 0),
                End = new TimeSpan(22, 0, 0)
            };

            var busyPeriod = new Period
            {
                Start = new TimeSpan(8, 0, 0),
                End = new TimeSpan(12, 0, 0)
            };

            var freePeriods = _service.GetFreePeriods(shedulePeriod, new[] { busyPeriod });

            Assert.AreEqual(freePeriods[0].Start, new TimeSpan(12, 0, 0));
            Assert.AreEqual(freePeriods[0].End, new TimeSpan(22, 0, 0));
        }

        [Test]
        public void WhenStartIsNotBusy_HalfIsBusy_EndIsNotBusy_ReturnStartPeriodAndLastPeriod()
        {
            var shedulePeriod = new Period
            {
                Start = new TimeSpan(8, 0, 0),
                End = new TimeSpan(22, 0, 0)
            };

            var busyPeriod = new Period
            {
                Start = new TimeSpan(10, 0, 0),
                End = new TimeSpan(19, 0, 0)
            };

            var freePeriods = _service.GetFreePeriods(shedulePeriod, new[] { busyPeriod });

            Assert.AreEqual(freePeriods[0].Start, new TimeSpan(8, 0, 0));
            Assert.AreEqual(freePeriods[0].End, new TimeSpan(10, 0, 0));

            Assert.AreEqual(freePeriods[1].Start, new TimeSpan(19, 0, 0));
            Assert.AreEqual(freePeriods[1].End, new TimeSpan(22, 0, 0));
        }

        [Test]
        public void WhenStartIsNotBusy_HalfIsNotBusy_EndIsNotBusy_ReturnStartPeriodMiddlePeriodLastPeriod()
        {
            var shedulePeriod = new Period
            {
                Start = new TimeSpan(8, 0, 0),
                End = new TimeSpan(22, 0, 0)
            };
            
            var busyPeriod = new Period
            {
                Start = new TimeSpan(9, 0, 0),
                End = new TimeSpan(13, 0, 0)
            };

            var busyPeriod2 = new Period
            {
                Start = new TimeSpan(16, 0, 0),
                End = new TimeSpan(20, 0, 0)
            };


            var freePeriods = _service.GetFreePeriods(shedulePeriod, new[] { busyPeriod , busyPeriod2 });

            Assert.AreEqual(freePeriods[0].Start, new TimeSpan(8, 0, 0));
            Assert.AreEqual(freePeriods[0].End, new TimeSpan(9, 0, 0));

            Assert.AreEqual(freePeriods[1].Start, new TimeSpan(13, 0, 0));
            Assert.AreEqual(freePeriods[1].End, new TimeSpan(16, 0, 0));

            Assert.AreEqual(freePeriods[2].Start, new TimeSpan(20, 0, 0));
            Assert.AreEqual(freePeriods[2].End, new TimeSpan(22, 0, 0));
        }

        [Test]
        public void WhenStartIsBusy_HalfIsBusy_EndIsBusy_ReturnStartPeriodMiddlePeriodLastPeriod()
        {
            var shedulePeriod = new Period
            {
                Start = new TimeSpan(8, 0, 0),
                End = new TimeSpan(22, 0, 0)
            };

            var busyPeriod = new Period
            {
                Start = new TimeSpan(8, 0, 0),
                End = new TimeSpan(10, 0, 0)
            };

            var busyPeriod2 = new Period
            {
                Start = new TimeSpan(13, 0, 0),
                End = new TimeSpan(16, 0, 0)
            };

            var busyPeriod3 = new Period
            {
                Start = new TimeSpan(19, 0, 0),
                End = new TimeSpan(22, 0, 0)
            };


            var freePeriods = _service.GetFreePeriods(shedulePeriod, new[] { busyPeriod, busyPeriod2, busyPeriod3 });

            Assert.AreEqual(freePeriods[0].Start, new TimeSpan(10, 0, 0));
            Assert.AreEqual(freePeriods[0].End, new TimeSpan(13, 0, 0));

            Assert.AreEqual(freePeriods[1].Start, new TimeSpan(16, 0, 0));
            Assert.AreEqual(freePeriods[1].End, new TimeSpan(19, 0, 0));

            
        }
    }


    [TestFixture]
    public class FreePeriodsSpecsTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void When()
        {
            Assert.Pass();
        }
    }
}
